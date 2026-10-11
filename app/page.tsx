import { existsSync } from "node:fs";
import { join } from "node:path";

import { PortfolioPage } from "@/components/portfolio-page";

export default function Home() {
  const hasResume = existsSync(join(process.cwd(), "public", "resume.pdf"));

  return <PortfolioPage hasResume={hasResume} />;
}

