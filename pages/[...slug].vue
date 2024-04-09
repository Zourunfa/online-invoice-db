<template>
  <div class="main-container">
    <div class="jspdf">
      <div class="toolbar">
        <button @click="toPdf">转为pdf</button>
      </div>

      <Invoice :invoiceGnForm="invoiceGnForm" />
    </div>
    <InvoiceForm :invoiceGnForm="invoiceGnForm" />
  </div>
</template>
<script setup>
import Invoice from '../components/Invoice.vue'
import generatePdf from '../utils/generatePdf'
import InvoiceForm from '../components/InvoiceForm.vue'
const path = route.path
const { data: rateData, pending } = await useFetch('/api/rate', {
  query: {
    uid: path,
  },
  // default() {
  //   return { r1: 0, r2: 0, r3: 0, r4: 0, r5: 0 };
  // },
})
console.log(data, '----asdas')
const invoiceGnForm = ref()
const initForm = () => {
  invoiceGnForm.value = {
    name: '',
    company: '',
    email: '',
    country: '',
    zipCode: '',
    addr: '',
    userNote: '',
    tax: '',
    total: '',
    invoiceDate: '',
    product1: '',
    product2: '',
    price1: '',
    price2: '',
    billTo: '',
    from: '',
    quantity: '1',
  }
}
initForm()
const toPdf = () => {
  generatePdf(document.querySelector('.invoice-page'), invoiceGnForm.value.tax)
}
</script>
<style scoped lang="scss">
.main-container {
  display: flex;
  max-width: 1500px;
  width: 90%;
  gap: 10px;
}
.jspdf {
  width: 70%;
  height: 100%;
  padding: 20px 0 0 20px;
  box-sizing: border-box;
  /* overflow-x: hidden; */
}

#app {
  width: 100%;
}
.pdf-container {
  width: 100%;
  overflow: auto;
  /* overflow-x: hidden; */
}

.chart-container {
  width: 100%;
  height: 500px;
  border: 1px dashed red;
  padding: 20px;
  box-sizing: border-box;
}

.toolbar {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 10;
}

button {
  padding: 8px 15px;
  box-sizing: border-box;
}
</style>
