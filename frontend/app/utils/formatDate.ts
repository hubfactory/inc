import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

export const formatDate = (dateStr: string) => {
  return format(new Date(dateStr), 'yyyy/MM/dd', { locale: ja });
};

export const getCurrentDate = () => {
  return format(new Date(), 'yyyy/MM/dd', { locale: ja });
};
