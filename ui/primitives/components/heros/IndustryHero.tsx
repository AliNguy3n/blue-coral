"use client";

import Image from "next/image";
import { useState } from "react";
import type { IconName } from "@/utils/icons";
import { RadioButton } from "../buttons/RadioButton";
import { RadioButtonBasic } from "../buttons/RadioButtonBasic";
import { Container } from "../../layout/Container";
import { Section } from "../../layout/Section";

export type IndustryModel = {
  value: string;
  label: string;
  description?: string;
};

export type Industry = {
  value: string;
  label: string;
  icon?: IconName | (string & {});
  badge?: string;
  image?: string;
  models: IndustryModel[];
};

export type IndustryHeroProps = {
  /** Lime pill above the heading. */
  eyebrow?: string;
  heading: string;
  body?: string;
  industries: Industry[];
  defaultIndustry?: string;
  onIndustryChange?: (industry: string) => void;
  onModelChange?: (industry: string, model: string) => void;
  className?: string;
};

export function IndustryHero({
  eyebrow,
  heading,
  body,
  industries,
  defaultIndustry,
  onIndustryChange,
  onModelChange,
  className,
}: IndustryHeroProps) {
  const [industry, setIndustry] = useState(defaultIndustry ?? industries[0]?.value);
  const [modelByIndustry, setModelByIndustry] = useState<Record<string, string>>({});

  const active = industries.find((entry) => entry.value === industry) ?? industries[0];
  if (!active) return null;

  const model = modelByIndustry[active.value] ?? active.models[0]?.value;
  const activeIndex = Math.max(
    0,
    industries.findIndex((entry) => entry.value === active.value),
  );

  return (
    <Section container={false} className={className}>
      <Container width="narrow">
        <div className="flex flex-col items-center gap-3 text-center lg:gap-6">
          {eyebrow && (
            <span className="flex h-6 items-center rounded-[24px] bg-brand-02 px-2.5 text-[10px] leading-4 font-extrabold uppercase text-brand-2-01 lg:h-7 lg:px-3 lg:text-xs lg:leading-6">
              {eyebrow}
            </span>
          )}
          <h2 className="text-[32px] leading-10 font-extrabold text-brand-2-01 lg:text-[56px] lg:leading-[68px]">
            {heading}
          </h2>
          {body && (
            <p className="max-w-[860px] text-base leading-6 text-brand-2-01">{body}</p>
          )}
        </div>
      </Container>

      <Container className="mt-10 lg:mt-[60px]">
        <div
          data-testid="feature-card"
          className="relative overflow-hidden rounded-[24px] bg-surface-tint pb-6 lg:rounded-[40px] lg:pb-[60px]"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 select-none"
          >
            <div className="absolute inset-0 opacity-20">
              <Image
                src="/top_mesh.svg"
                alt=""
                width={1805}
                height={1973}
                className="absolute top-[-206px] left-[-300px] h-[596px] w-[545px] max-w-none lg:top-[-1007px] lg:left-[-836px] lg:h-[1973px] lg:w-[1805px]"
              />
              <Image
                src="/bottom_mesh.svg"
                alt=""
                width={2316}
                height={2532}
                className="absolute top-[221px] left-[129px] h-[765px] w-[700px] max-w-none lg:top-[-56px] lg:left-[517px] lg:h-[2532px] lg:w-[2316px]"
              />
              <span className="absolute top-[-63px] left-[197px] h-[518px] w-[285px] origin-top-left rotate-[43.08deg] bg-surface-tint blur-[250px] lg:top-[-600px] lg:left-[876px] lg:h-[1713px] lg:w-[942px]" />
            </div>

            <span className="absolute top-[-227px] left-[-14px] size-[344px] rounded-full bg-surface-sage opacity-50 blur-[150px] lg:top-[-429px] lg:left-[354px] lg:size-[588px]" />
            <span className="absolute top-[301px] left-[124px] size-[588px] rounded-full bg-surface-sage opacity-60 blur-[150px] lg:top-[311px] lg:left-[864px]" />
          </div>

          <div className="relative" data-testid="tabbar">
            <RadioButtonBasic
              options={industries.map(({ value, label, icon, badge }) => ({
                value,
                label,
                icon,
                badge,
              }))}
              value={active.value}
              onChange={(next) => {
                setIndustry(next);
                onIndustryChange?.(next);
              }}
            />
          </div>

          <div className="relative mt-6 grid gap-4 px-6 md:grid-cols-[540fr_600fr] md:items-start md:gap-8 md:px-10 lg:mt-10 lg:gap-20 lg:px-[60px]">
            <RadioButton
              className="md:aspect-[540/600]"
              options={active.models}
              value={model}
              onChange={(next) => {
                setModelByIndustry((current) => ({ ...current, [active.value]: next }));
                onModelChange?.(active.value, next);
              }}
            />

            <div
              data-testid="slide-viewport"
              className="aspect-square w-full overflow-hidden rounded-[16px] bg-white lg:rounded-[24px]"
            >
              <div
                className="flex h-full transition-transform duration-500 ease-out motion-reduce:transition-none"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {industries.map((entry) => {
                  const isActive = entry.value === active.value;
                  return (
                    <div
                      key={entry.value}
                      role="img"
                      aria-label={`Ảnh minh hoạ cho ${entry.label}`}
                      aria-hidden={!isActive}
                      className="relative h-full w-full shrink-0"
                    >
                      {entry.image && (
                        <Image
                          src={entry.image}
                          alt=""
                          fill
                          sizes="(min-width: 1512px) 600px, (min-width: 768px) 45vw, 90vw"
                          className="object-cover"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
