import "./App.css";
import Board from "./component/board/board";
import Login from "./page/login/login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate
} from "react-router-dom";
import Dashboard from "./page/dashboard/dashboard";
import GreenHouse from "./page/greenhouse/greenhouse";
import Monitoring from "./page/monitoring/monitoring";
import Controlling from "./page/controlling/controlling";
import Notification from "./page/notification/notification";
import GreenhouseAdd from "./page/greenhouse/greenhouse_add";
import GreenhouseEdit from "./page/greenhouse/greenhouse_edit";
import Monitoring_Add from "./page/monitoring/monitoring_add";
import Controlling_Add from "./page/controlling/controlling_add";
import Monitoring_Edit from "./page/monitoring/monitoring_edit";
import Controlling_Edit from "./page/controlling/controlling_edit";
import MoreNotification from "./page/notification/more_notification";
import Automation from "./page/automation/automation";
import Grafik from "./page/grafik/grafik";
import AutomationAdd from "./page/automation/automation_add";
import AutomationEdit from "./page/automation/automation_edit";
import ScheduleEdit from "./page/automation/scheduling_edit";
import MonitoringDetail from "./page/monitoring/monitoring_detail";
import ControllingDetail from "./page/controlling/Controlling_detail";
import GuardRoute from "./component/guard_route/GuardRoute";
import { useEffect, useState } from "react";
import NotFound from "./component/not_found/NotFound";
import { useSelector } from "react-redux";
import { selectToken, selectUser } from "./features/auth/authSlice";

function App() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      { token && (
        <Route path="/unit" element={<Board />}>
            <Route path="dashboard/:id" element={<Dashboard />} />
            <Route path="greenhouse" element={<GreenHouse />} />
         { user === 'admin' ? ( 
            <>
              <Route path="monitoring" element={<Monitoring />} />
              <Route path="controlling" element={<Controlling />} />
              <Route path="historynotifikasi" element={<Notification />} />
            </>
            ) : (
              <Route path="*" element={<Dashboard />} />
            )
         }
            <Route path="*" element={<Dashboard />} />
         </Route>
        )}
    </Routes>
  );
}

export default App;
