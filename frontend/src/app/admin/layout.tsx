import { Providers } from "@/app/providers";

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return <Providers>{children}</Providers>;
}
