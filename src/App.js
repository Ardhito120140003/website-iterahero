import './App.css';
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Board from './component/board/board';
import Login from './page/login/login';
import Dashboard from './page/dashboard/dashboard';
import GreenHouse from './page/greenhouse/greenhouse';
import Monitoring from './page/monitoring/monitoring';
import Controlling from './page/controlling/controlling';
import Notification from './page/notification/notification';
import GreenhouseAdd from './page/greenhouse/greenhouse_add';
import GreenhouseEdit from './page/greenhouse/greenhouse_edit';
import Monitoring_Add from './page/monitoring/monitoring_add';
import Controlling_Add from './page/controlling/controlling_add';
import Monitoring_Edit from './page/monitoring/monitoring_edit';
import Controlling_Edit from './page/controlling/controlling_edit';
import MoreNotification from './page/notification/more_notification';
import Automation from './page/automation/automation';
import Grafik from './page/grafik/grafik';
import AutomationAdd from './page/automation/automation_add';
import AutomationEdit from './page/automation/automation_edit';
import ScheduleEdit from './page/automation/scheduling_edit';
import { selectToken, selectUser } from './features/auth/authSlice';
import Peracikan from './page/peracikan/peracikan';
import Penjadwalan from './page/penjadwalan/penjadwalan';
import DashboardOperator from './page/dashboard/dashboard_operator';

function App() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      {token && (
        <Route path="/unit" element={<Board />}>
          <Route path="dashboard/:id" element={user === 'admin' ? <Dashboard /> : <DashboardOperator />} />
          <Route path="greenhouse" element={<GreenHouse />} />
          <Route path="peracikan" element={<Peracikan />} />
          <Route path="penjadwalan" element={<Penjadwalan />} />
          <Route path="greenhouse/add" element={<GreenhouseAdd />} />
          <Route path="greenhouse/:slug" element={<GreenhouseEdit />} />
          {user === 'admin' ? (
            <>
              <Route path="monitoring" element={<Monitoring />} />
              <Route path="controlling" element={<Controlling />} />
              <Route path="historynotifikasi" element={<Notification />} />
              <Route
                path="historynotifikasi/more-notifcation"
                element={<MoreNotification />}
              />
              <Route path="dashboard/sensor/:id" element={<Grafik />} />
              <Route path="monitoring/add/:id" element={<Monitoring_Add />} />
              <Route path="controlling/add/:id" element={<Controlling_Add />} />
              <Route path="monitoring/edit/:id" element={<Monitoring_Edit />} />
              <Route
                path="controlling/edit/:id"
                element={<Controlling_Edit />}
              />
              <Route
                path="controlling/edit/:id"
                element={<Controlling_Edit />}
              />
              <Route path="dashboard/aktuator/:id" element={<Automation />} />
              <Route
                path="dashboard/aktuator/automation/add/:id"
                element={<AutomationAdd />}
              />
              <Route
                path="dashboard/aktuator/schedule/edit/:id"
                element={<ScheduleEdit />}
              />
              <Route
                path="dashboard/aktuator/automation/edit/:id"
                element={<AutomationEdit />}
              />
            </>
          ) : (
            <Route path="*" element={<Dashboard />} />
          )}
          <Route path="*" element={<Dashboard />} />
        </Route>
      )}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
