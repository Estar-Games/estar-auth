import { Body, Controller, Post, Req, RawBodyRequest } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { OrderStatus } from 'src/common/types';

@Controller('stripe')
export class StripeController {
    constructor(private readonly stripeService: StripeService, private readonly configService: ConfigService) {}

    @Post('/webhook')
    async webhook(@Req() req: RawBodyRequest<Request>) {
        const payload = req.rawBody;
        const sig = req.headers['stripe-signature'];
        const endpointSecret = this.configService.get<string>('STRIPE_WEBHOOK_SECRET');

        const event = this.stripeService.stripe.webhooks.constructEvent(
            payload,
            sig,
            endpointSecret,
        );
        await this.stripeService.webhook(event);
    }
}
