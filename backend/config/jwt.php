<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Signing Secret
    |--------------------------------------------------------------------------
    |
    | This key is used to sign and verify the JSON Web Tokens issued to admins.
    | It must be a long, random string and must never be committed to source
    | control. Rotating the key invalidates every token that was issued.
    |
    */

    'secret' => env('JWT_SECRET'),

    /*
    |--------------------------------------------------------------------------
    | Signing Algorithm
    |--------------------------------------------------------------------------
    |
    | The hashing algorithm used to sign the token. HS256 is a symmetric
    | algorithm, so the same secret is used to sign and to verify.
    |
    */

    'algorithm' => env('JWT_ALGORITHM', 'HS256'),

    /*
    |--------------------------------------------------------------------------
    | Issuer
    |--------------------------------------------------------------------------
    |
    | Written to the "iss" claim and verified when a token is decoded, so a
    | token signed for another application can never be accepted here.
    |
    */

    'issuer' => env('JWT_ISSUER', env('APP_NAME', 'laravel')),

    /*
    |--------------------------------------------------------------------------
    | Token Lifetime
    |--------------------------------------------------------------------------
    |
    | How long, in minutes, an issued token remains valid. After this period
    | the token is rejected and the admin must sign in again.
    |
    */

    'ttl' => (int) env('JWT_TTL', 60),

    /*
    |--------------------------------------------------------------------------
    | Leeway
    |--------------------------------------------------------------------------
    |
    | The number of seconds of tolerance allowed when validating the time
    | based claims, which absorbs small clock differences between servers.
    |
    */

    'leeway' => (int) env('JWT_LEEWAY', 0),

];
