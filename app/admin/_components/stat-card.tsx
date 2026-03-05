import { Card, CardContent } from "@/components/ui/card"

type StatCardProps = {
  title: string
  value: number
  icon: React.ReactNode
  color: string
}

export default function StatCard({
  title,
  value,
  icon,
  color,
}: StatCardProps) {
  return (
    <Card className="border">
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h2 className="text-2xl font-bold">{value}</h2>
        </div>

        <div className={`p-3 rounded-md ${color}`}>
          {icon}
        </div>
      </CardContent>
    </Card>
  )
}