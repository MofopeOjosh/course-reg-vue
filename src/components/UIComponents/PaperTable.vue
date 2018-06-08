<template>
  <div>
    <div class="header" v-if="show==true">
      <slot name="header">
      
        <h4 class="title">{{title}}</h4>
        <p class="category">{{subTitle}}</p>
      </slot>
    </div>
    <div class="content table-responsive table-full-width">
      <table class="table" :class="tableClass">
        <thead>
          <th v-for="column in columns">{{column}}</th>
          <th v-if="signature">Signature</th> 
          <th v-if="action" class="text-center">{{action.name}}</th> 

        </thead>
        <tbody>
          <tr v-for="item in data">
            <td v-for="column in columns" v-if="hasValue(item, column)">{{itemValue(item, column)}}</td>
            <td v-if="item['signed']"><img :src="'static/uploads/'+item['signed']+'.png'" class="img-responsive" width="50"></td>
            <td v-if="action" class="text-center"><button class="btn" :class="action.class" @click="emitAction(item.idd, item.course)"><i :class="action.icon"></i></button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      show: false,
      columns: Array,
      data: Array,
      type: {
        type: String, // striped | hover
        default: 'striped'
      },
      title: {
        type: String,
        default: ''
      },
      subTitle: {
        type: String,
        default: ''
      },
      signature: String,
      action: Object
    },
    data() {
      return{
        selected: '',
      }
    },
    computed: {
      tableClass () {
        // return `table-${this.type}`
      }
    },
    methods: {
      hasValue (item, column) {
        return item[column.toLowerCase()] !== 'undefined'
      },
      itemValue (item, column) {
        return item[column.toLowerCase()]
      },
      emitAction(id, course) {
        this.$emit(this.action.method, id, course)
        // this.$emit('adder')
      }

    }
  }

</script>
<style>

</style>
