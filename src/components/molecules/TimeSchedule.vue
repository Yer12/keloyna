<template>
  <div class="calendar">
    <div class="calender_div">
      <div class="section_title">
        <div class="title_circle"></div>
        <h1>Расписание</h1>
      </div>
      <table class="">
        <thead>

        <th></th>
        <th v-for="w in 7">
          <div v-if="w === 1">
            {{ today + w -1 }} {{month}} <span>сегодня</span>
          </div>
          <div v-else>
            {{ today + w -1 }} {{month}}
          </div>
        </th>



        </thead>
        <tbody>
          <tr v-for="t in close - start + 1">
            <td>{{+start + t - 1 + ':00'}}</td>
            <td v-for="w in [1,2,3,4,5,6,7]">
              <div key="w" class="tablePrice"  @click="chosenTime(+start + t-1, w)">3000 ТГ</div>
            </td>
          </tr>
        </tbody>
      </table>
      <hr/>
      <div class="chosen_section">
        <div class="chosen_row" v-for="c in this.checkedTimes">
          <div class="chosen_date">{{ c.day - 1 }} {{ c.month }} <span v-if="c.day - 1 === today">сегодня</span></div>
          <div class="chosen_time">{{ c.time + ' : 00'}}</div>
          <div class="chosen_section_price">3000 тг</div>
          <div class="cancel_button">
            <button class="cancel" @click="deleteEvent(c.id)">Отменить</button>
          </div>
        </div>

        <div class="total_info">
          <div class="totalPrice">
            Итого : <span>{{ this.checkedTimes.length * price }} тг</span>
          </div>
          <div class="booking_button">
            <router-link to="/booking">
              Забронировать
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TimeSchedule",
  props: ['close', 'start', "price"],
  data() {
    let today;
    let month;
    return {
      checkedTimes: [

      ],
      today,
      month,
    }
  },

  methods: {
    deleteEvent(c) {
      for (let i = 0; i < this.checkedTimes.length; i++) {
        console.log(c)
        if(c === this.checkedTimes[i].id) {
          console.log('c.id:',c,'chTid:', this.checkedTimes[i].id)
          this.checkedTimes.splice(this.checkedTimes[i],1)
        }
      }
    },
    chosenTime(time, id) {

      event.target.classList.toggle('checked')
      this.checkedTimes.push({
        id: ''+time+id,
        time: time,
        day: id+this.today,
        month: this.month
      })
    },
    date_function() {
      const monthArr = ['Январь', "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
      let currentDate = new Date();
      this.today = currentDate.getDate()
      this.month = monthArr[currentDate.getMonth()]
    }
  },
  created() {
    this.date_function()
  }
}
</script>

<style lang="scss" scoped>

/*Schedule*/
.calendar {
  height: 100%;
  background: #00202A;
  margin-bottom: 50px;
  padding-bottom: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.calender_div {
  padding-top: 50px;
  width: 70%;
}
.section_title {
  display: flex;
  align-items: center;
}
.section_title h1 {
  font-weight: 600;
  font-size: 35px;
  line-height: 149.7%;
  letter-spacing: 0.025em;
  text-transform: capitalize;
  color: #FFFFFF;

  @media screen and (max-width: 900px) {
    font-size: 25px;
  }

}
.title_circle {
  margin-right: 10px;
  width: 20px;
  height: 20px;
  background: #00AADE;
  border-radius: 50%;
}
table {
  width: 100%;
  color: #fff;
  font-weight: 600;
  font-size: 20px;
  line-height: 149.7%;
  letter-spacing: 0.025em;
  text-transform: capitalize;
}
table thead th{
  cursor: pointer;
}
table thead th:nth-child(2) span {
  color: #00AADE;
}
table tbody tr td{
  padding-top: 20px;
  padding-bottom: 20px;
  text-align: center;
}
.tablePrice:hover {
  background-color: rgba(6, 59, 75, 0.76);
  box-sizing: border-box;
  width: 122px;
  border-radius: 15px;
}
.tablePrice.checked {
  border: 2px solid #00AADE;
  box-sizing: border-box;
  width: 122px;
  border-radius: 15px;
  color: #00AADE;
}
.tablePrice.disabled {
  color: #00475D;
}
.tablePrice {
  width: 100px;
  margin: 0 auto;
  padding: 12px;
  cursor: pointer;
}

.chosen_section {
  margin-top: 40px;
  font-weight: 600;
  font-size: 24px;
  line-height: 149.7%;
  letter-spacing: 0.025em;
  text-transform: lowercase;
  color: #FFFFFF;
}
.chosen_row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  margin-top: 20px;
}
.chosen_date span{
  color: #00AADE;
}
.chosen_date, .chosen_time, .chosen_section_price, .cancel_button {
  width: 30%;
  text-align: right;
}
.chosen_date {
  text-align: left;
}
.cancel_button button {
  float: right;
}
.cancel {
  cursor: pointer;
  border: 2px solid #FFFFFF;
  box-sizing: border-box;
  border-radius: 11px;
  background: transparent;
  font-size: 20px;
  line-height: 149.7%;
  width: 160px;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 0.025em;
  text-transform: capitalize;
  color: #FFFFFF;
}

.total_info {
  padding-bottom: 50px;
  margin-top: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  line-height: 149.7%;
  font-size: 30px;

  /* or 45px */

  letter-spacing: 0.025em;
  text-transform: capitalize;

  color: #00AADE;

}


@media screen and (max-width: 500px) {
  .totalPrice {
    font-size: 24px !important;
  }
}
.booking_button a{
  font-weight: 600;
  font-size: 28px;
  line-height: 149.7%;
  /* or 45px */
  padding: 10px 40px;
  letter-spacing: 0.025em;
  text-transform: capitalize;
  color: #00AADE;
  background: transparent;
  border: 2px solid #00AADE;
  border-radius: 25px;
}
.booking_button a:hover {
  background-color: #00AADE;
  color: #ffffff;
}
@media screen  and (max-width: 900px) {
  /*Schedule*/
  .section_title {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  table thead th, tbody tr td {
    display: none;
  }
  table thead tr, table thead th:nth-child(2), tbody tr {
    display: flex;
    align-items: center;
  }
  table thead th:nth-child(2) {
    font-size: 18px;
  }
  table thead th:nth-child(2),
  tbody tr td:nth-child(2),
  tbody tr td:nth-child(1)
  {
    display: block;
    width: 100%;
  }

  /*Schedule*/
  .chosen_row {
    display: none;
  }
  .total_info {
    flex-direction: column;
  }
  .booking_button {
    margin-top: 50px;
    width: auto;
  }
  .booking_button a {
    width: 100%;
    font-size: 22px;
  }

  .give_rating .feedback_rating {
    width: 30px;
    height: 30px;
  }
  .send_button button {
    padding: 10px 20px;
  }

}
</style>