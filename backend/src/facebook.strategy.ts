import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';

@Injectable()
export class FacebookStrategy extends PassportStrategy(
  Strategy,
  'facebook',
) {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.getOrThrow<string>('FACEBOOK_APP_ID'),
      clientSecret: configService.getOrThrow<string>('FACEBOOK_APP_SECRET'),
      callbackURL: configService.getOrThrow<string>('FACEBOOK_CALLBACK_URL'),
      profileFields: ['id', 'displayName', 'emails'],
      scope: ['email'],
    });
  }

  validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ) {
    return {
      provider: 'facebook',
      id: profile.id,
      name: profile.displayName,
      email: profile.emails?.[0]?.value ?? null,
      photoUrl: null,
    };
  }
}