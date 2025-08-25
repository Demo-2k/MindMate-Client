import { GeneralStats } from "../stats/general/generalFirst"
import { Card } from "../ui/card"
import Calendar from "./calendar"

export const Month = () =>{
    return(
        <div>
            <Card className="bg-black text-white p-3 border-white/50">
            <GeneralStats />
          </Card>
          <Calendar/>
        </div>
    )
}