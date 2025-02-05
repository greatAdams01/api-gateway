import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  BadRequestException
} from '@nestjs/common';
import { InjectConnection, InjectModel, Schema } from '@nestjs/mongoose';
import { Connection, Model, ObjectId } from 'mongoose';
import { IGeo } from 'src/interfaces';
import { Notice, NoticeDocument } from 'src/notification/notification.schema';
import { ISession } from 'src/typings';
import { User, UserDocument } from 'src/user/entity/user.schema';
import { cloudinaryUpload } from 'src/utils/cloudinary';
import { CreateCampaignDTO, UpdateCampaignDTO } from '../dto/campaign.dto';
import { CampaignStatusEnum } from '../dto/campaign.interface';
import { CampaignGateway } from '../gateway/campaign.gateway';
import { Campaign, CampaignDocument, View, ViewDocument } from '../schema/campaign.schema';
import { Endorsement } from '../schema/endorsement.schema';
import { ClientProxy } from '@nestjs/microservices';
// import { viewCampMail, updateCampMail } from  '../../utils/sendMaijet'

export class ISessionResponseData {
  id: any;
  user: string;
  location: IGeo;
}
@Injectable()
export class CampaignService {
  constructor(
    @Inject('MAIL_SERVICE') private client: ClientProxy,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(View.name)
    private viewModel: Model<ViewDocument>,
    @InjectModel(Campaign.name)
    private readonly campaignModel: Model<CampaignDocument>,
    @InjectModel(Endorsement.name)
    private readonly endorsementModel: Model<Endorsement>,
    @InjectModel(Notice.name)
    private readonly noticeModel: Model<NoticeDocument>,
    private campaignGateway: CampaignGateway,
    @InjectConnection() private connection: Connection,
  ) {}
  async create(data: CreateCampaignDTO, user: UserDocument): Promise<Campaign> {
    const author = user?.id;

    if (!author) throw new UnauthorizedException('No author');
    const image = await cloudinaryUpload(data.image).catch((err) => {
      throw err;
    });
    const { body } = data;
    let excerpt: string;
    if (body) {
      excerpt = body.split(' ').splice(0, 36).join(' ');
    }

    try {
      const campaign = await this.campaignModel.create({
        ...data,
        author,
        excerpt,
        image,
        numberOfPaidEndorsementCount: 0,
        numberOfPaidViewsCount: 0,
        region: user.country,

      });
      this.campaignGateway.createdCampaign({
        campaignTitle: campaign.title,
        user,
      });


      // Get all users 
    const users = await this.userModel.find()
    // Extract email and user name
    const usersEmails = users.map(user => {
     return {email: user.email, username: user.firstName}
    })

    // Get all campaigns to display 
    const allCampaigns = await this.campaignModel.find()

    // Payload to be sent
    const mailPayload = {
      users: usersEmails,
      campaign: campaign,
      campaigns: allCampaigns
    }
    // proxy function
    this.client.emit('campaign-created', mailPayload)

      
      return campaign;
    } catch (error) {
      throw error;
    }
  }
  async findAll(region?: string, limit?: number, ): Promise<Campaign[]> {
    try {
      const campaigns = await this.campaignModel
        .find({ region: region })
        .sort({ createdAt: -1 })
        .limit(limit)
        .populate('author', 'id firstName lastName image')
        .populate('endorsements', 'id')
        .populate('views');

      return campaigns as unknown as Promise<CampaignDocument[]>;
    } catch (error) {
      throw error;
    }
  }

  async findAllOtherRegions(limit?: number, ): Promise<Campaign[]> {
    try {
      const campaigns = await this.campaignModel
        .find()
        .sort({ createdAt: -1 })
        .limit(limit)
        .populate('author', 'id firstName lastName image')
        .populate('endorsements', 'id')
        .populate('views');

      return campaigns as unknown as Promise<CampaignDocument[]>;
    } catch (error) {
      throw error;
    }
  }

  async findAllActive(region: string, limit?: number): Promise<Campaign[]> {
    try {
      const campaigns = await this.campaignModel
        .find({ status: CampaignStatusEnum.Active })
        .sort({ createdAt: -1 })
        .populate('author', 'id firstName lastName')
        .populate('endorsements', 'id');
      
      const regionCampains = campaigns.filter(camp => camp.region === region)
      return regionCampains as unknown as Promise<CampaignDocument[]>;
    } catch (error) {
      throw error;
    }
  }

  async findAllActiveOtherRegions(region: string, limit?: number): Promise<Campaign[]> {
    try {
      const campaigns = await this.campaignModel
        .find({ status: CampaignStatusEnum.Active })
        .sort({ createdAt: -1 })
        .populate('author', 'id firstName lastName')
        .populate('endorsements', 'id');

      return campaigns as unknown as Promise<CampaignDocument[]>;
    } catch (error) {
      throw error;
    }
  }

  async findOne(slug: string): Promise<CampaignDocument> {
    try {
      const campaigns = await this.campaignModel
        .findOne({ slug })
        .populate('author', 'id firstName lastName')
        .populate('endorsements');

      return campaigns;
    } catch (error) {
      throw error;
    }
  }

  async update(data: Partial<UpdateCampaignDTO>): Promise<Campaign> {
    try {
      const campaign = await this.campaignModel.findOneAndUpdate(
        { _id: data.id },
        data,
        { new: true },
      );
      // const author = await this.userModel.findById(campaign.author)git 

      // await updateCampMail(campaign.title, author.email, author.name)
      return campaign;
    } catch (error) {
      throw error;
    }
  }
  async delete(id: string): Promise<CampaignDocument> {
    try {
      const campaign = await this.campaignModel.findById(id);
      if (!campaign) throw new NotFoundException('Record not found');
      await this.endorsementModel.deleteMany({ campaign: id as any });
      campaign.remove();
      return campaign;
    } catch (error) {
      throw error;
    }
  }

  async updateSession(
    id: string,
    sessionID: string,
  ): Promise<CampaignDocument> {
    try {
      let campaign = await this.campaignModel.findById(id);
      const session = await this.session(sessionID);
      if (!campaign) throw new NotFoundException();
      let view = await this.connection.models.View.findOne({
        sessionId: session.id,
      });

      if (!view) {
        view = await this.connection.models.View.create({
          sessionId: session.id,
          country: session.location.country_name,
          user: session?.user,
        });
      } else {
        if (!campaign.views.some((v) => v.sessionId === session.id)) {
          campaign = await this.campaignModel.findByIdAndUpdate(
            id,
            {
              $addToSet: {
                views: view.id,
              },
            },
            { new: true },
          );
        }
      }

      return campaign;
    } catch (error) {
      throw error;
    }
  }

  async like(
    campaign_id: string,
    user: UserDocument,
  ): Promise<CampaignDocument> {
    const campaign = await this.campaignModel.findById(campaign_id);

    if (campaign?.likes?.includes(user.id)) {
      return await this.unLike(campaign_id, user);
    } else {
      try {
        const campaign = await this.campaignModel.findOneAndUpdate(
          { _id: campaign_id },
          { $addToSet: { likes: user?.id } },
          { new: true },
        );

        return campaign;
      } catch (error) {
        throw error;
      }
    }
  }
  async unLike(
    campaign_id: string,
    user: UserDocument,
  ): Promise<CampaignDocument> {
    try {
      const campaign = await this.campaignModel.findOneAndUpdate(
        { _id: campaign_id },
        { $pull: { likes: user?.id } },
        { new: true },
      );
      return campaign;
    } catch (error) {
      throw error;
    }
  }
  async myCampaigns(user_id: string): Promise<Campaign[]> {
    try {
      const campaigns = await this.campaignModel
        .find({
          author: user_id as any,
        })
        .sort({ createdAt: -1 });

      return campaigns;
    } catch (error) {
      throw error;
    }
  }
  async approveCampaign(campaign_id: string): Promise<CampaignDocument> {
    let campaign = await this.campaignModel.findById(campaign_id);
    try {
      campaign = await this.campaignModel.findOneAndUpdate(
        { _id: campaign_id },
        {
          $set: {
            status:
              campaign.status === CampaignStatusEnum.Active
                ? CampaignStatusEnum.Pending
                : CampaignStatusEnum.Active,
          },
        },
        { new: true },
      );
      return campaign;
    } catch (error) {
      throw error;
    }
  }

  async viewCampaign(
    id: string,
    userId: string,
  ): Promise<string> {
    try {
      const campaign = await this.campaignModel.findById(id);
      const user = await this.userModel.findById(userId)
      if(!campaign || !user) throw new Error('Not found')

      if(campaign.author.toString() === userId.toString())
        return 'Author Viewed'

      if(campaign.views.includes(userId)) return 'Viewed'

      // Sending email to the author 
      const author = await this.userModel.findById(campaign.author)


      campaign.views.push(userId)
      campaign.save()
      // console.log(campaign)
      // await viewCampMail(campaign.title, user?.name, author.email, author.name)
      return 'Viewer Added';
    } catch (error) {
      console.log(error)
      throw error;
    }
  }
  async findAllNotice(model?: string) {
    try {
      if (model) {
        const notifications = await this.noticeModel
          .find({
            db_model: model,
          })
          .populate({
            path: 'user',
            select: 'id image firstName lastName',
          })
          .sort({ createdAt: -1 });

        return notifications;
      } else {
        const notifications = await this.noticeModel
          .find({})
          .populate({
            path: 'user',
            select: 'id image firstName lastName',
          })
          .sort({ createdAt: -1 });

        return notifications;
      }
    } catch (error) {
      throw error;
    }
  }
  async feature(campaign_id: ObjectId): Promise<CampaignDocument> {
    let campaign = await this.campaignModel.findById(campaign_id);
    try {
      campaign = await this.campaignModel.findOneAndUpdate(
        { _id: campaign_id },
        { $set: { featured: !campaign.featured } },
      );
      return campaign;
    } catch (error) {
      throw error;
    }
  }
  async session(_id: string): Promise<ISessionResponseData> {
    try {
      const data = await this.connection.db
        .collection('sessions')
        .findOne({ _id });
      if (!data) throw new NotFoundException();
      const result: ISession = JSON.parse(data.session);

      return {
        id: data._id,
        user: result.passport.user.id,
        location: result.location,
      };
    } catch (error) {
      throw error;
    }
  }
}
