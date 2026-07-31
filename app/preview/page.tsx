"use client";

import { useState } from "react";
import {
  Button,
  Container,
  IconButton,
  RadioButton,
  RadioButtonBasic,
  Section,
  Slide,
} from "@/ui";

const INDUSTRIES = [
  { value: "food", label: "Ăn uống", icon: "food" as const },
  { value: "retail", label: "Bán lẻ", icon: "shopping" as const, badge: "NEW" },
  { value: "service", label: "Dịch vụ", icon: "chair" as const, badge: "NEW" },
];

const MODELS = [
  {
    value: "cafe",
    label: "Quán cà phê",
    description:
      "Qtable POS giúp order nhanh, chọn size/topping, in phiếu bar và quản lý mang đi/ngồi lại hiệu quả.",
  },
  { value: "restaurant", label: "Quán ăn / nhà hàng", description: "Mô tả cho quán ăn / nhà hàng." },
  { value: "bar", label: "Quán bar / lounge / pub", description: "Mô tả cho quán bar / lounge / pub." },
  { value: "mobile", label: "Quán ăn di động", description: "Mô tả cho quán ăn di động." },
  { value: "tea", label: "Tiệm trà sữa", description: "Mô tả cho tiệm trà sữa." },
  { value: "bakery", label: "Tiệm bánh", description: "Mô tả cho tiệm bánh." },
];

export default function PreviewPage() {
  const [industry, setIndustry] = useState("food");
  const [model, setModel] = useState("cafe");

  return (
    <div className="bg-bg-05 text-brand-2-01">
      <Section tone="cream">
        <div data-testid="buttons" className="flex flex-wrap items-center gap-4">
          <Button trailingIcon="arrowRight">Sử dụng miễn phí</Button>
          <Button variant="outline">Đăng nhập</Button>
          <Button variant="dark">Dark</Button>
          <Button size="sm" trailingIcon="arrowRight">
            Sử dụng miễn phí
          </Button>
          <Button variant="outline" size="sm">
            Đăng nhập
          </Button>
          <Button disabled>Disabled</Button>
        </div>

        <div data-testid="icon-buttons" className="mt-10 flex items-center gap-4">
          <IconButton icon="chevronDown" label="Mở menu" />
          <IconButton icon="arrowRight" label="Tiếp" variant="outline" size="md" />
          <IconButton icon="arrowRight" label="Tiếp" variant="primary" size="md" />
          <IconButton icon="arrowRight" label="Tiếp" variant="dark" size="lg" />
        </div>
      </Section>

      <Section tone="cream" container={false}>
        <Container>
          <div data-testid="radio-basic">
            <RadioButtonBasic
              options={INDUSTRIES}
              value={industry}
              onChange={setIndustry}
            />
          </div>
        </Container>
      </Section>

      <Section tone="cream">
        <div data-testid="radio-button" className="max-w-[540px]">
          <RadioButton options={MODELS} value={model} onChange={setModel} />
        </div>
      </Section>

      <Section tone="cream">
        <div data-testid="slide">
          <Slide aria-label="Demo">
            {["01", "02", "03", "04"].map((n) => (
              <div
                key={n}
                className="flex h-[240px] items-center justify-center rounded-[24px] bg-brand-2-01 text-[56px] font-extrabold text-brand-02"
              >
                {n}
              </div>
            ))}
          </Slide>
        </div>
      </Section>
    </div>
  );
}
