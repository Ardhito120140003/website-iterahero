// const base_url = "https://iterahero.fly.dev";
const base_url = "https://iterahero.fly.dev";
export const loginApi = `${base_url}/api/v1/login`;
export const dashboardApi = `${base_url}/api/v1/dashboard`;
export const greenhouseByUserId = `${base_url}/api/v1/greenhouse`;
export const controllingApi = `${base_url}/api/v1/actuator?by_greenhouse_id=`;
export const monitoringApi = `${base_url}/api/v1/sensor?by_id_greenhouse=`;
export const listGreenhouse = `${base_url}/api/v1/greenhouse?size=100`;
export const addGreenhouse = `${base_url}/api/v1/greenhouse`;
export const deleteGreenhouse = `${base_url}/api/v1/greenhouse/`;
export const updateGreenhouse = `${base_url}/api/v1/greenhouse/`;
export const getApiGreenhouse = `${base_url}/api/v1/greenhouse/`;
export const categoryApi = `${base_url}/api/v1/category/sensor`;
export const addSensorApi = `${base_url}/api/v1/sensor`;
export const addActuatorApi = `${base_url}/api/v1/actuator`;
export const deleteAktuatorApi = `${base_url}/api/v1/actuator/`;
export const deleteSensorApi = `${base_url}/api/v1/sensor/`;
export const paginationMonitoring = `${base_url}/api/v1/sensor?by_id_greenhouse=`;
export const paginationAktuator = `${base_url}/api/v1/actuator?by_greenhouse_id=`;
export const getNotificationByUserId = `${base_url}/api/v1/notification?by_user_id=1`;
export const brokerSensor = `${base_url}/api/v1/sensor_broker?id_sensor=`;
export const idSensor = `${base_url}/api/v1/sensor/`;

export const getGrafikSensor = `${base_url}/api/v1/grafik/`;
export const deleteNotification = `${base_url}/api/v1/notification/`;

export const updateActuatorDetail = `${base_url}/api/v1/actuator/`;

export const updateSensorDetail = `${base_url}/api/v1/sensor/`;

export const getLogAktuator = `${base_url}/api/v1/actuator-log?by_actuator_id=`;
export const getActuatorDetail = `${base_url}/api/v1/actuator/`;
export const postLogAktuator = `${base_url}/api/v1/actuator-log`;
export const icons = `${base_url}/api/v1/icon`;
export const Status = `${base_url}/api/v1/actuator-broker?id_actuator=`;
export const actuatorLogToday = `${base_url}/api/v1/actuator-log-today/`;
export const getAutomationByActuator = `${base_url}/api/v1/automation?id_actuator=`;

export const addAutomation = `${base_url}/api/v1/automation`;
export const deleteAutomation = `${base_url}/api/v1/automation/`;
export const apiGetAutomation = `${base_url}/api/v1/automation/`;

export const scheduling = `${base_url}/api/v1/schedule`;

export const summary = `${base_url}/api/v1/summary`;
export const downloadSummary = `${base_url}/api/v1/download_summary`;
