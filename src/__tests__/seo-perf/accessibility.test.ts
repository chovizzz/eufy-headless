/**
 * SEO & 无障碍性能回归测试
 * 防止 Lighthouse SEO/Accessibility 扣分项回归
 */
import { describe, it, expect } from "vitest";

// ── 颜色对比度工具 ─────────────────────────────────────────────────────────────

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return [r, g, b];
}

function relativeLuminance(r: number, g: number, b: number): number {
  const toLinear = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

function contrastRatio(hex1: string, hex2: string): number {
  const [r1, g1, b1] = hexToRgb(hex1);
  const [r2, g2, b2] = hexToRgb(hex2);
  const l1 = relativeLuminance(r1, g1, b1);
  const l2 = relativeLuminance(r2, g2, b2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// ── 颜色对比度测试 ─────────────────────────────────────────────────────────────

const THEME_COLORS = {
  "eufy-accent": "#c0392b",
  "eufy-text-light": "#6e6e73",
  "eufy-dark": "#1a1a1a",
  "eufy-blue": "#1a73e8",
  "eufy-text": "#333333",
  white: "#ffffff",
  "eufy-gray": "#f5f5f7",
};

describe("Color contrast ratios (WCAG AA)", () => {
  it("eufy-accent (#c0392b) on white meets 4.5:1 for small text", () => {
    const ratio = contrastRatio(THEME_COLORS["eufy-accent"], THEME_COLORS.white);
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  it("white text on eufy-accent (#c0392b) meets 4.5:1", () => {
    const ratio = contrastRatio(THEME_COLORS.white, THEME_COLORS["eufy-accent"]);
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  it("eufy-text-light (#6e6e73) on white meets 4.5:1 for normal text", () => {
    const ratio = contrastRatio(THEME_COLORS["eufy-text-light"], THEME_COLORS.white);
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  it("eufy-dark (#1a1a1a) on white exceeds 7:1 (AAA)", () => {
    const ratio = contrastRatio(THEME_COLORS["eufy-dark"], THEME_COLORS.white);
    expect(ratio).toBeGreaterThanOrEqual(7);
  });

  it("eufy-text (#333333) on white meets 4.5:1", () => {
    const ratio = contrastRatio(THEME_COLORS["eufy-text"], THEME_COLORS.white);
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  it("eufy-blue (#1a73e8) on white meets 3:1 for large text (AA Large)", () => {
    const ratio = contrastRatio(THEME_COLORS["eufy-blue"], THEME_COLORS.white);
    expect(ratio).toBeGreaterThanOrEqual(3);
  });

  it("white text on eufy-dark (#1a1a1a) exceeds 7:1", () => {
    const ratio = contrastRatio(THEME_COLORS.white, THEME_COLORS["eufy-dark"]);
    expect(ratio).toBeGreaterThanOrEqual(7);
  });
});

// ── 图片优化规则测试 ───────────────────────────────────────────────────────────

import { readFileSync } from "fs";
import { glob } from "glob";
import path from "path";

const SRC_DIR = path.resolve(process.cwd(), "src");

function getComponentFiles(): string[] {
  return glob.sync(`${SRC_DIR}/components/**/*.tsx`);
}

function getFileContent(filePath: string): string {
  return readFileSync(filePath, "utf-8");
}

describe("Image optimization rules", () => {
  it("all <img> tags in components use loading='lazy' or are replaced by next/image", () => {
    const files = getComponentFiles();
    const violations: string[] = [];

    files.forEach((file) => {
      const content = getFileContent(file);
      const imgTags = content.match(/<img\s[^>]*>/g) || [];
      imgTags.forEach((tag) => {
        if (!tag.includes('loading="lazy"') && !tag.includes("loading='lazy'")) {
          violations.push(`${path.basename(file)}: ${tag.substring(0, 80)}`);
        }
      });
    });

    expect(violations).toEqual([]);
  });

  it("next/Image components with fill prop have sizes attribute", () => {
    const files = getComponentFiles();
    const violations: string[] = [];

    files.forEach((file) => {
      const content = getFileContent(file);
      if (!content.includes("next/image")) return;

      const imageBlocks = content.match(/<Image[\s\S]*?\/>/g) || [];
      imageBlocks.forEach((block) => {
        if (block.includes("fill") && !block.includes("sizes")) {
          violations.push(`${path.basename(file)}: Image with fill missing sizes`);
        }
      });
    });

    expect(violations).toEqual([]);
  });

  it("hero banner first image has priority prop for LCP optimization", () => {
    const heroFile = `${SRC_DIR}/components/home/HeroBanner.tsx`;
    const content = getFileContent(heroFile);
    expect(content).toContain("priority");
  });
});

// ── 链接文字 SEO 规则测试 ──────────────────────────────────────────────────────

describe("Link text SEO rules", () => {
  it("generic 'Learn More' links (Link/a tags) have aria-label for context", () => {
    const files = getComponentFiles();
    const violations: string[] = [];

    files.forEach((file) => {
      const content = getFileContent(file);
      // Only match actual anchor/Link elements, not <span> or other elements
      const learnMoreLinks = content.match(/<(?:Link|a)\s[^>]*>[\s\S]*?Learn More[\s\S]*?<\/(?:Link|a)>/g) || [];

      learnMoreLinks.forEach((link) => {
        if (!link.includes("aria-label")) {
          violations.push(`${path.basename(file)}: "Learn More" link missing aria-label`);
        }
      });
    });

    expect(violations).toEqual([]);
  });

  it("generic 'Click Here' links are not used", () => {
    const files = getComponentFiles();
    const violations: string[] = [];

    files.forEach((file) => {
      const content = getFileContent(file);
      if (/>\s*Click Here\s*</.test(content)) {
        violations.push(path.basename(file));
      }
    });

    expect(violations).toEqual([]);
  });
});

// ── robots.txt 格式回归测试 ────────────────────────────────────────────────────

describe("robots.txt source code regression", () => {
  it("robots route handler uses full URL for Sitemap (no bare path)", () => {
    const robotsFile = `${SRC_DIR}/app/robots.txt/route.ts`;
    const content = getFileContent(robotsFile);
    expect(content).toContain("SITE_URL}/sitemap.xml");
    expect(content).not.toMatch(/Sitemap:\s*\/sitemap\.xml/);
  });

  it("robots route handler strips trailing slash from SITE_URL", () => {
    const robotsFile = `${SRC_DIR}/app/robots.txt/route.ts`;
    const content = getFileContent(robotsFile);
    expect(content).toContain('replace(/\\/$/, "")');
  });
});
