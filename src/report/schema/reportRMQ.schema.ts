// import { ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ReportEnum } from './report.dto';

export type ReportDocumentRMQ = ReportRMQ & Document;


@Schema({
  timestamps: true
})
export class ReportRMQ extends Document {
  @Prop({ required: true })
  campaignSlug: string;
  @Prop({ 
    required: true,
    type: String,
    enum: ReportEnum,
  })
  reportType: ReportEnum;
  @Prop({ required: true })
  reportMessage: string;
}

export const ReportSchemaRMQ = SchemaFactory.createForClass(ReportRMQ);
