import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser, GQLGuard, GQLoginGuard, locationGLQ } from 'src/auth/guards/graphql.guard';
import { UserDocument } from 'src/user/entity/user.schema';
import { CampaignService } from '../services/campaign.service';
import { EndorsementService } from '../services/endorsement.service';
// import { RealIP } from 'nestjs-real-ip';
import { Req } from '@nestjs/common'
import { Request } from 'express'

@Resolver('Campaign')
export class CampaignResolver {
  constructor(
    private readonly campaignService: CampaignService,
    private readonly endorsementService: EndorsementService,
  ) {}
  @UseGuards(GQLoginGuard)
  @Query()
  async myCampaign(@CurrentUser() user: UserDocument) {
    // console.log(user)
    return await this.campaignService.myCampaigns(user?.id);
  }
  @Query()
  async getCampaigns(@Args('limit') limit: number, @locationGLQ() location) {

    const region = location.country_name

    return await this.campaignService.findAll(region);
  }

  @Query()
  async getCampaignsOtherRegion() {
    return await this.campaignService.findAllOtherRegions()
  }

  @Query()
  async getCampaign(@Args('slug') slug: string) {
    return await this.campaignService.findOne(slug);
  }
  @Query()
  async getActiveCampaigns(@Args('limit') limit: number, @locationGLQ() location) {
    const region = location.country_name
    return await this.campaignService.findAllActive(region);
  }

  @Query()
  async getActiveCampaignsOtherRegion(@Args('limit') limit: number, @locationGLQ() location) {
    const region = location.country_name
    return await this.campaignService.findAllActiveOtherRegions;
  }

  @Mutation()
  async deleteCampaign(@Args('id') id: string) {
    return await this.campaignService.delete(id);
  }
}
