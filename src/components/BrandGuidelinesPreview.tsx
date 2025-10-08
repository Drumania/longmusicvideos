
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

export function BrandGuidelinesPreview() {
  const colors = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
  ];

  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="font-sans">Typography & Colors</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          {colors.map((color) => (
            <div 
              key={color}
              className="h-10 w-10 rounded-full"
              style={{ backgroundColor: color }}
            ></div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
