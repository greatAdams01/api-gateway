import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import {
  Campaign,
  CampaignDocument,
} from 'src/campaign/schema/campaign.schema';
import config from 'src/utils/config';
import {
  PaymentPurposeEnum,
  TransactionPaymentResponse,
} from './transaction.interface';
import { Transaction, TransactionDocument } from './transaction.schema';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<TransactionDocument>,
    @InjectModel(Campaign.name)
    private readonly campaignModel: Model<CampaignDocument>,
  ) {}

  async webhook(e: TransactionPaymentResponse) {
    try {
      const transaction = await this.transactionModel.create({
        ...e.data,
        transactionId: e.data.id,
        purpose: e.data.metadata?.purpose,
        key: e.data.metadata?.key,
      });
      console.log(e)
      if (transaction.purpose === PaymentPurposeEnum.VIEWS || transaction.purpose === PaymentPurposeEnum.ENDORSEMENT) {
        await this.campaignModel
          .findByIdAndUpdate(
            transaction.key,
            {
              $set: { promoted: true },
            },
            { new: true },
          )
          .catch((e) => {
            throw e;
          });
      }
      const _id = e.data.metadata.key
      let value
      const campaign = await this.campaignModel.findById(_id)
      if(transaction.purpose === PaymentPurposeEnum.VIEWS) {
        value = e.data.metadata?.numberOfViews
        const numViews = parseInt(value)
        campaign.numberOfPaidViewsCount += numViews
        await campaign.save()
        return true
      }

      value = e.data.metadata?.numberOfEndorsements
      const numEd = parseInt(value)
      campaign.numberOfPaidEndorsementCount += numEd
      await campaign.save()

      return true;
    } catch (error) {
      throw error;
    }
  }
  async verifyPayment(reference: string): Promise<TransactionDocument> {
    try {
      const { data } = await axios.get(
        `https://api.paystack.co/transaction/verify/${reference}`,
        {
          headers: {
            Authorization: `Bearer ${config.PAYSTACK_SK}`,
          },
        },
      );
      const res = data as TransactionPaymentResponse;
      const transaction = await this.transactionModel.create({
        ...res.data,
        transactionId: res.data.id,
        purpose: res.data.metadata?.purpose,
        key: res.data.metadata?.key,
      });
      if (transaction.purpose === PaymentPurposeEnum.VIEWS || transaction.purpose === PaymentPurposeEnum.ENDORSEMENT) {
        await this.campaignModel
          .findByIdAndUpdate(
            transaction.key,
            {
              $set: { promoted: true },
            },
            { new: true },
          )
          .catch((e) => {
            throw e;
          });
      }
      return transaction;
    } catch (error) {
      console.log(error);
      throw error;
    }
    // const transaction = await this.transactionModel.create({ ...data, transactionId: data.message });
  }
}
