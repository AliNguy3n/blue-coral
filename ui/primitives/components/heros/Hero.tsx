import { getImageProps } from "next/image";
import { cn } from "@/utils/cn";
import { Button } from "../buttons/Button";
import { Logo } from "../buttons/Logo";
import { Slide } from "../slides/Slide";
import { Container } from "../../layout/Container";

export type HeroSlide = {
  id: string;
  src: string;
  "mobile-src"?: string;
  alt?: string;
  heading?: string;
  body?: string;
  cta?: { label: string; href: string };
};

export type HeroProps = {
  slides: readonly HeroSlide[];
  autoPlay?: boolean;
  className?: string;
  "aria-label"?: string;
  carouselLabel?: string;
};

export function Hero({
  slides,
  autoPlay = true,
  className,
  "aria-label": ariaLabel = "Giới thiệu",
  carouselLabel = "Ảnh giới thiệu",
}: HeroProps) {
  if (slides.length === 0) return null;

  return (
    <section aria-label={ariaLabel} className={cn("w-full", className)}>
      <Container width="default" className="px-5 md:px-10 xl:px-[86px]">
        <Slide aria-label={carouselLabel} autoPlay={autoPlay}>
          {slides.map((slide, index) => {
            const Heading = index === 0 ? "h1" : "p";
            const common = {
              alt: slide.alt ?? "",
              preload: index === 0,
              fetchPriority: index === 0 ? ("high" as const) : undefined,
            };
            const {
              props: { srcSet: desktopSrcSet },
            } = getImageProps({
              ...common,
              src: slide.src,
              width: 1340,
              height: 650,
              sizes: "(min-width: 1512px) 1340px, 100vw",
            });
            const {
              props: { srcSet: mobileSrcSet, alt: imgAlt, ...imgProps },
            } = getImageProps({
              ...common,
              src: slide["mobile-src"] ?? slide.src,
              width: 700,
              height: 480,
              sizes: "100vw",
            });

            return (
              <div
                key={slide.id}
                className="relative overflow-hidden rounded-[12px] bg-bg-05 lg:rounded-[24px]"
              >
                <picture>
                  <source
                    media="(min-width: 1024px)"
                    srcSet={desktopSrcSet}
                    width={1340}
                    height={650}
                  />
                  <source srcSet={mobileSrcSet} />
                  <img
                    {...imgProps}
                    alt={imgAlt}
                    className="block h-auto w-full"
                  />
                </picture>
                {slide.heading && (
                  <div className="relative px-6 pt-4 pb-6 md:px-10 md:pt-6 lg:px-14 lg:pt-10 lg:absolute lg:inset-0 lg:flex lg:items-center xl:px-[86px] xl:py-[80px]">
                    <div className="mx-auto w-full max-w-[1168px] lg:grid lg:grid-cols-12">
                      <div className="flex flex-col col-span-7 pr-10">
                        <div className="badge-ring badge-ring-solid flex w-fit items-center rounded-[80px] bg-white py-1.5 pl-1.5 pr-3 shadow-neumorph lg:badge-ring-fade lg:bg-white/50 lg:py-2 lg:pl-2">
                          <Logo
                            size="sm"
                            className="!h-[20px] !w-[58px] lg:!h-[28px] lg:!w-[81px]"
                          />
                        </div>

                        <Heading className="mt-3 max-w-[588px] text-[32px] leading-10 font-extrabold text-brand-2-01 lg:max-w-none lg:whitespace-pre-line lg:text-[48px] lg:leading-[68px] xl:text-[56px]">
                          {slide.heading}
                        </Heading>

                        {slide.body && (
                          <p className="mt-4 max-w-[588px] text-sm leading-5 text-brand-2-01 lg:mt-6 lg:max-w-none lg:text-base lg:leading-7">
                            {slide.body}
                          </p>
                        )}

                        {slide.cta && (
                          <Button
                            href={slide.cta.href}
                            variant="dark"
                            size="sm"
                            trailingIcon="arrowRight"
                            iconClassName="size-5 lg:size-8"
                            className="mt-4 self-start px-5 lg:mt-6 lg:h-[60px] lg:w-[234px] lg:gap-2 lg:px-7 lg:text-base"
                          >
                            {slide.cta.label}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </Slide>
      </Container>
    </section>
  );
}
