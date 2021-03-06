import moment from 'moment';
import 'moment/locale/es-us';

class Order {
  constructor(id, items, totalAmount, date) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this.date = date;
  }

  get readableDate() {
    // return this.date.toLocaleDateString('es-PE', {
    //   year: 'numeric',
    //   month: 'long',
    //   day: 'numeric',
    //   hour: '2-digit',
    //   minute: '2-digit'
    // })
    moment.locale('es-us');
    return moment(this.date).format('DD/MM/YYYY hh:mm');
  }
};

export default Order;