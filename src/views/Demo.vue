<template>
  <a-form
      ref="formRef"
      :model="formState"
      name="basic"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      :rules="rules"
      autocomplete="on"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
  >
    <a-form-item
        label="Username"
        name="username"
    >
      <a-input v-model:value="formState.username"/>
    </a-form-item>

    <a-form-item
        label="Password"
        name="password"
    >
      <a-input-password v-model:value="formState.password"/>
    </a-form-item>
    <a-form-item label="Instant delivery" name="delivery">
      <a-switch v-model:checked="formState.delivery"/>
    </a-form-item>
    <a-form-item label="Activity type" name="type">
      <a-checkbox-group v-model:value="formState.type">
        <a-checkbox value="1" name="type">Online</a-checkbox>
        <a-checkbox value="2" name="type">Promotion</a-checkbox>
        <a-checkbox value="3" name="type">Offline</a-checkbox>
      </a-checkbox-group>
    </a-form-item>
    <a-form-item label="Resources" name="resource">
      <a-radio-group v-model:value="formState.resource">
        <a-radio value="1">Sponsor</a-radio>
        <a-radio value="2">Venue</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="Activity form" name="desc">
      <a-textarea v-model:value="formState.desc"/>
    </a-form-item>
    <a-form-item name="date-time-picker" label="DatePicker[showTime]">
      <a-date-picker
          v-model:value="formState['date-time-picker']"
          show-time
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
      />
    </a-form-item>
    <a-form-item name="range-time-picker" label="RangePicker[showTime]">
      <a-range-picker
          v-model:value="formState['range-time-picker']"
          show-time
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
      />
    </a-form-item>
    <a-form-item
        name="select"
        label="Select"
        has-feedback
        :rules="[{ required: true, message: 'Please select your country!' }]"
    >
      <a-select v-model:value="formState.select" placeholder="Please select a country">
        <a-select-option value="china">China</a-select-option>
        <a-select-option value="usa">U.S.A</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item
        name="select-multiple"
        label="Select[multiple]"
        :rules="[{ required: true, message: 'Please select your favourite colors!', type: 'array' }]"
    >
      <a-select
          v-model:value="formState['select-multiple']"
          mode="multiple"
          placeholder="Please select favourite colors"
      >
        <a-select-option value="red">Red</a-select-option>
        <a-select-option value="green">Green</a-select-option>
        <a-select-option value="blue">Blue</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="InputNumber">
      <a-form-item name="input-number" no-style>
        <a-input-number v-model:value="formState['input-number']" :min="1" :max="10"/>
      </a-form-item>
      <span class="ant-form-text">machines</span>
    </a-form-item>
    <a-form-item name="slider" label="Slider">
      <a-slider
          v-model:value="formState.slider"
          :marks="{
          0: 'A',
          20: 'B',
          40: 'C',
          60: 'D',
          80: 'E',
          100: 'F',
        }"
      />
    </a-form-item>
    <a-form-item
        name="radio-button"
        label="Radio.Button"
        :rules="[{ required: true, message: 'Please pick an item!' }]"
    >
      <a-radio-group v-model:value="formState['radio-button']">
        <a-radio-button value="a">item 1</a-radio-button>
        <a-radio-button value="b">item 2</a-radio-button>
        <a-radio-button value="c">item 3</a-radio-button>
      </a-radio-group>
    </a-form-item>
    <a-form-item name="rate" label="Rate">
      <a-rate v-model:value="formState.rate" allow-half/>
    </a-form-item>
    <a-form-item name="upload" label="Upload" extra="longgggggggggggggggggggggggggggggggggg">
      <a-upload
          v-model:fileList="formState.upload"
          name="logo"
          action="/upload.do"
          list-type="picture"
      >
        <a-button>
          <template #icon><UploadOutlined /></template>
          Click to upload
        </a-button>
      </a-upload>
    </a-form-item>
    <a-form-item label="Dragger">
      <a-form-item name="dragger" no-style>
        <a-upload-dragger v-model:fileList="formState.dragger" name="files" action="/upload.do">
          <p class="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p class="ant-upload-text">Click or drag file to this area to upload</p>
          <p class="ant-upload-hint">Support for a single or bulk upload.</p>
        </a-upload-dragger>
      </a-form-item>
    </a-form-item>
    <a-form-item :labelCol="labelCol" :wrapper-col="wrapperCol">
      <a-button type="primary" html-type="submit">Submit</a-button>
      <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
    </a-form-item>
  </a-form>
</template>
<script setup>
import {reactive, ref} from 'vue';

const formRef = ref();
const labelCol = {
  span: 0,
};
const wrapperCol = {
  span: 4,
};
const formState = reactive({
  username: '',
  password: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
});
const rules = {
  username: [{required: true, message: 'Please input your username!'}],
  password: [{required: true, message: 'Please input your password!'}]
};
const onFinish = values => {
  console.log('Success:', values);
};
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};
const resetForm = () => {
  formRef.value.resetFields();
};
</script>
