import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request, Response } from 'express';

type Provider = 'google' | 'facebook';

type OAuthUser = {
  provider: Provider;
  id: string;
  name: string;
  email: string | null;
  photoUrl: string | null;
};

type RequestWithOAuthUser = Request & {
  user?: OAuthUser;
};

@Controller('auth')
export class AuthController {
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    // Passport tự redirect trình duyệt sang Google.
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleCallback(
    @Req() request: RequestWithOAuthUser,
    @Res() response: Response,
  ) {
    return this.redirectToFrontend(request.user, response);
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  facebookLogin() {
    // Passport tự redirect trình duyệt sang Facebook.
  }

  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  facebookCallback(
    @Req() request: RequestWithOAuthUser,
    @Res() response: Response,
  ) {
    return this.redirectToFrontend(request.user, response);
  }

  private redirectToFrontend(
    user: OAuthUser | undefined,
    response: Response,
  ) {
    if (!user) {
      return response.redirect(
        'http://localhost:5173?error=oauth_login_failed',
      );
    }

    const userText = encodeURIComponent(JSON.stringify(user));

    return response.redirect(
      `http://localhost:5173?provider=${user.provider}&user=${userText}`,
    );
  }
}