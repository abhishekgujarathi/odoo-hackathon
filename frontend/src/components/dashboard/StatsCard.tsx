import { Card, CardContent } from "@/components/ui/card";

type Props = {
  title: string;
  value: string;
};

export function StatsCard({
  title,
  value,
}: Props) {
  return (
    <Card>
      <CardContent className="p-6">
        <p className="text-muted-foreground text-sm">
          {title}
        </p>

        <h3 className="text-3xl font-bold mt-2">
          {value}
        </h3>
      </CardContent>
    </Card>
  );
}