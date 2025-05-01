import { useQueryClient } from "@tanstack/react-query";

 
 
 //공통 캐시 초기화
  export const invalidateQueries = (queryKeys: string[]) => {
    const queryClient = useQueryClient();
    
    queryKeys.forEach(key => {
      queryClient.invalidateQueries({ queryKey: [key] });
    });
  };