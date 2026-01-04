import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="mt-5">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold capitalize">
            Dashboard overview
          </h1>
          <p className="text-muted-foreground">
            Welcome back, Here's what happening in your organization
          </p>
        </div>
        <Button className="cursor-pointer capitalize">customize colors</Button>
      </div>
    </div>
  );
}
