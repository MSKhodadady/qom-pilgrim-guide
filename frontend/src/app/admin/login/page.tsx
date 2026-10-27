"use client";

import {
  Alert02Icon,
  Loading03Icon,
  LockPasswordIcon,
  UserIcon,
  ViewIcon,
  ViewOffIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMutation } from "@tanstack/react-query";
import { authLogin } from "api-sdk";
import { type SubmitEvent, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setAuthToken } from "@/lib/auth";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const login = useMutation({
    mutationFn: (credentials: Parameters<typeof authLogin>[0]) =>
      authLogin(credentials),
    onSuccess: (response) => {
      if (response.status === 200) {
        setAuthToken(response.data.token);
        window.location.href = "/admin";
        return;
      } else if (response.status === 401) {
        setFormError("نام کاربری یا رمز عبور اشتباه است.");
      } else {
        setFormError("خطای برنامه");
      }
    },
    onError: () => {
      setFormError("اتصال برقرار نشد.");
    },
  });

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    login.mutate({ username, password });
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-base">ورود ادمین</CardTitle>
        <CardDescription>
          نام کاربری و رمز عبور خود را وارد کنید.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
          noValidate
        >
          {formError ? (
            <Alert variant="destructive">
              <HugeiconsIcon icon={Alert02Icon} strokeWidth={2} />
              <AlertTitle>ناموفق!</AlertTitle>
              <AlertDescription>{formError}</AlertDescription>
            </Alert>
          ) : null}

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="username">نام کاربری</Label>
            <div className="relative">
              <HugeiconsIcon
                icon={UserIcon}
                strokeWidth={2}
                className="pointer-events-none absolute inset-y-0 left-2 my-auto size-3.5 text-muted-foreground"
              />
              <Input
                id="username"
                name="username"
                autoComplete="username"
                placeholder="admin"
                required
                value={username}
                onChange={(event) => setUsername(event.currentTarget.value)}
                className="pl-7"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password">رمز عبور</Label>
            <div className="relative">
              <HugeiconsIcon
                icon={LockPasswordIcon}
                strokeWidth={2}
                className="pointer-events-none absolute inset-y-0 left-2 my-auto size-3.5 text-muted-foreground"
              />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(event) => setPassword(event.currentTarget.value)}
                className="px-7"
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-2 my-auto text-muted-foreground transition-colors hover:text-foreground"
              >
                <HugeiconsIcon
                  icon={showPassword ? ViewOffIcon : ViewIcon}
                  strokeWidth={2}
                  className="size-3.5"
                />
              </button>
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={login.isPending}
            className="mt-1 w-full"
          >
            {login.isPending ? (
              <HugeiconsIcon
                icon={Loading03Icon}
                strokeWidth={2}
                className="animate-spin"
              />
            ) : null}
            {login.isPending ? "در حال ورود ..." : "ورود"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
