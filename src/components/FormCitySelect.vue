<template>
  <div class="address">
    <el-col :span="7">
      <el-select :class="{ 'is-error': isShowError && !publicForm.province }" v-model="publicForm.province" style="width: 100%;" placeholder="请选择省级地区" v-on:change="getProv($event)">
        <el-option v-for="item in provinces" :key="item.name" :label="item.name" :value="item.name"></el-option>
      </el-select>
    </el-col>
    <el-col class="select-line" :span="1">-</el-col>
    <el-col :span="7">
      <el-select :class="{ 'is-error': isShowError && !publicForm.city }" v-model="publicForm.city" style="width: 100%;" placeholder="请选择市级地区" v-on:change="getCity($event)">
        <el-option v-for="item in citys" :key="item.name" :label="item.name" :value="item.name"></el-option>
      </el-select>
    </el-col>
    <el-col class="select-line" :span="1">-</el-col>
    <el-col :span="8">
      <el-select :class="{ 'is-error': isShowError && !publicForm.region }" v-model="publicForm.region" style="width: 100%;" placeholder="请选择区级地区" v-on:change="getRegion($event)">
        <el-option v-for="item in regions" :key="item.name" :label="item.name" :value="item.name"></el-option>
      </el-select>
    </el-col>
    <!--<div class="el-form-item__error" v-if="isShowError && !(publicForm.province && publicForm.city && publicForm.region)">-->
      <!--请选择完整的省市区-->
    <!--</div>-->
  </div>
</template>

<script>
  import "../assets/css/form-city-select.less"
  import allRegion from '../plugins/city'

  export default {
    name: "FormCitySelect",
    props: {
      province: {
        type: String,
        default: ''
      },
      city: {
        type: String,
        default: ''
      },
      region: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        publicForm: {
          province: this.province,
          city: this.city,
          region: this.region
        },
        provinces: allRegion,
        citys: [],
        regions: [],
        chooseProv: '',
        isShowError: false
      }
    },
    mounted() {
    },
    methods: {
      getProv: function (prov) {
        let tempCity = this.getChildren(prov, allRegion, 0);
        this.citys = tempCity;
        this.regions = [];
        this.chooseProv = prov;
        this.publicForm.city = '';
        this.publicForm.region = '';
        this.onChangeValue()
      },
      getCity: function (city) {
        let tempRegion = this.getChildren(city, allRegion, 1);
        this.regions = tempRegion;
        this.publicForm.region = '';
        this.onChangeValue()
      },
      getRegion: function (region) {
        this.onChangeValue()
      },
      getChildren: function (regionName, regionData, level) {
        let tempData = [];
        if (level == 0) {
          for (let _item of regionData) {
            if (_item.name == regionName) {
              tempData = _item.sub;
            }
          }
        } else {
          let cityData = this.getChildren(this.chooseProv, allRegion, 0);
          return this.getChildren(regionName, cityData, 0);
        }
        return tempData;
      },
      onChangeValue: function() {
        this.isShowError = true
        this.$emit('change', this.publicForm)
      },
      resetValue: function () {
        this.publicForm.province = '';
        this.publicForm.city = '';
        this.publicForm.region = '';
      }
    }
  };
</script>
