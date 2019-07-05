<template>
    <div class="address">
        <el-col :span="7">
            <el-select v-model="publicForm.province"  style="width: 100%;" placeholder="请选择省级地区" v-on:change="getProv($event)">
                <el-option v-for="item in provinces" :key="item.name" :label="item.name" :value="item.name"></el-option>
            </el-select>
        </el-col>
        <el-col class="select-line" :span="1">-</el-col>
        <el-col :span="7">
            <el-select v-model="publicForm.city"  style="width: 100%;" placeholder="请选择区级地区" v-on:change="getCity($event)">
                <el-option v-for="item in citys" :key="item.name" :label="item.name" :value="item.name"></el-option>
            </el-select>
        </el-col>
        <el-col class="select-line" :span="1">-</el-col>
        <el-col :span="8">
            <el-select v-model="publicForm.region"  style="width: 100%;" placeholder="请选择市级地区" v-on:change="getRegion($event)">
                <el-option v-for="item in regions" :key="item.name" :label="item.name" :value="item.name"></el-option>
            </el-select>
        </el-col>
    </div>
</template>

<script>
    import "../assets/css/form-city-select.less"
    import allRegion from '../plugins/city'

    export default {
        name: "FormCitySelect",
        data() {
            return {
                publicForm: {
                    province:'',
                    city:'',
                    region:''
                },
                provinces:allRegion,
                citys:[],
                regions:[],
                chooseProv:'',
            }
        },
        mounted() {

        },
        methods:{
            getProv: function (prov) {
                let tempCity = this.getChildren(prov,allRegion,0);
                this.citys = tempCity;
                this.regions = [];
                this.chooseProv = prov;
                this.publicForm.city = '';
                this.publicForm.region = '';
            },
            getCity: function (city) {
                let tempRegion = this.getChildren(city,allRegion,1);
                this.regions = tempRegion;
                this.publicForm.region = '';
            },
            getRegion: function (region) {
            },
            getChildren:function(regionName,regionData,level){
                let tempData = [];
                if(level == 0){
                    for (let _item of regionData){
                        if(_item.name == regionName){
                            tempData = _item.sub;
                        }
                    }
                }else{
                    let cityData = this.getChildren(this.chooseProv,allRegion,0);
                    return this.getChildren(regionName,cityData,0);
                }
                return tempData;
            },

        }
    };
</script>
