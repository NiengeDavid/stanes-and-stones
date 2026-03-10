import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

interface QuoteEmailProps {
  name?: string;
  email: string;
  category: string;
  deliverable: string;
  deliverableLabel?: string;
  timeline: string;
  timelineLabel?: string;
  pages: number;
  currency: string;
  total: number;
  breakdown: {
    pagesTotal: number;
    deliverableMultiplier: number;
    timelineMultiplier: number;
  };
  notes?: string;
}

export const QuoteEmail = ({
  name,
  email,
  category,
  deliverable,
  deliverableLabel,
  timeline,
  timelineLabel,
  pages,
  currency,
  total,
  breakdown,
  notes,
}: QuoteEmailProps) => {
  const previewText = `Your Custom Web Development Quote from Syntax`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                background: "#030711",
                foreground: "#fafafa",
                primary: "#fafafa",
                "primary-foreground": "#0f172a",
                muted: "#1e293b",
                "muted-foreground": "#94a3b8",
                border: "#1e293b",
              },
            },
          },
        }}
      >
        <Body className="bg-background font-sans text-foreground my-auto mx-auto px-2">
          <Container className="border border-border rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              <Heading className="text-primary text-[24px] font-bold text-center p-0 my-[30px] mx-0">
                Your Quote
              </Heading>
              <Text className="text-foreground text-[14px] leading-[24px]">
                Hello{name ? ` ${name}` : ""},
              </Text>
              <Text className="text-foreground text-[14px] leading-[24px]">
                Here is the breakdown of your project quote based on the details
                you provided.
              </Text>
            </Section>

            <Section className="my-[32px] p-[20px] bg-muted rounded-md">
              <Row>
                <Column>
                  <Text className="text-muted-foreground text-[12px] font-semibold uppercase tracking-wider m-0">
                    Project Category
                  </Text>
                  <Text className="text-foreground text-[16px] font-medium m-0 mt-[4px]">
                    {category}
                  </Text>
                </Column>
                <Column>
                  <Text className="text-muted-foreground text-[12px] font-semibold uppercase tracking-wider m-0">
                    Pages
                  </Text>
                  <Text className="text-foreground text-[16px] font-medium m-0 mt-[4px]">
                    {pages}
                  </Text>
                </Column>
              </Row>
              <Row className="mt-[20px]">
                <Column>
                  <Text className="text-muted-foreground text-[12px] font-semibold uppercase tracking-wider m-0">
                    Deliverable
                  </Text>
                  <Text className="text-foreground text-[16px] font-medium m-0 mt-[4px]">
                    {deliverableLabel || deliverable}
                  </Text>
                </Column>
                <Column>
                  <Text className="text-muted-foreground text-[12px] font-semibold uppercase tracking-wider m-0">
                    Timeline
                  </Text>
                  <Text className="text-foreground text-[16px] font-medium m-0 mt-[4px]">
                    {timelineLabel || timeline}
                  </Text>
                </Column>
              </Row>
            </Section>

            <Section className="my-[32px]">
              <Row>
                <Column className="w-full">
                  <Text className="text-foreground text-[18px] font-bold m-0">
                    Total Estimated Cost
                  </Text>
                </Column>
                <Column className="text-right">
                  <Text className="text-primary text-[24px] font-bold m-0">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: currency,
                    }).format(total)}
                  </Text>
                </Column>
              </Row>
            </Section>

            <Hr className="border-border mx-0 w-full" />

            <Section className="mt-[32px]">
              <Text className="text-muted-foreground text-[14px] leading-[24px]">
                This is an automated estimate. For a final binding quote and to
                discuss your project in detail, please reply to this email.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default QuoteEmail;
