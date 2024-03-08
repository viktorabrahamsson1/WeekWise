import CalenderHeader from "../components/calender/CalenderHeader";
import CalenderMain from "../components/calender/CalenderMain";

function Calender() {
  return (
    <div className="flex flex-col gap-8">
      <CalenderHeader />
      <CalenderMain />
    </div>
  );
}

export default Calender;
