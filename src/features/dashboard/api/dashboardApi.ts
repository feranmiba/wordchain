import { apiClient } from "@/src/shared/lib/apiClient";
import { DashboardResponse, PersonalData, MyPosition, DailyMissionsResponse } from "@/src/features/auth/types";

class DashboardApi {
  async getDashboardData(): Promise<DashboardResponse> {
    const response = await apiClient.get<DashboardResponse>('/dashboard/stats');
    return response.data;
  }

  async getPersonalData(): Promise<PersonalData> {
    const response = await apiClient.get<PersonalData>('/stats/personal');
    return response.data
  }

  async getMyPostion(): Promise<MyPosition> {
    const response = await apiClient.get<MyPosition>('/leaderboard/me');
    return response.data
  }

  async getDailyMissions(): Promise<DailyMissionsResponse> {
    const response = await apiClient.get<DailyMissionsResponse>('/missions/daily');
    return response.data;
  }
}

const dashboardApi = new DashboardApi();

export { dashboardApi };