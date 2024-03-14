import { Cell, Pie, PieChart } from "recharts";

type dataProps = {
  name: string;
  value: number;
};

type ProgressCircleProps = {
  title: string;
  data: dataProps[];
  colors: string[];
};

function ProgressCircle({ title, data, colors }: ProgressCircleProps) {
  return (
    <div className="relative flex flex-col  items-center gap-2 ">
      <h3 className="text-center text-xl font-semibold">{title}</h3>
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </PieChart>
      <span className={`absolute bottom-20 text-2xl font-semibold `}>
        {data[0].value}
      </span>
    </div>
  );
}

export default ProgressCircle;
