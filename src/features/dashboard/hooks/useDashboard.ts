import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '../api/dashboardApi';

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboardStats'],
    queryFn: () => dashboardApi.getDashboardData(),
  });
};

export const usePersonalStats = () => {
  return useQuery({
    queryKey: ['personalStats'],
    queryFn: () => dashboardApi.getPersonalData(),
  });
};

export const useUserPosition = () => {
  return useQuery({
    queryKey: ['userPosition'],
    queryFn: () => dashboardApi.getMyPostion(),
  });
};

export const useDailyMissions = () => {
  return useQuery({
    queryKey: ['dailyMissions'],
    queryFn: () => dashboardApi.getDailyMissions(),
  });
};
