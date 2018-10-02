<template>
  <div class="ebook">
  <title-bar :ifTitleAndMenushow="ifTitleAndMenushow"></title-bar>
<div class="read-wrapper">
    <div id="read"></div>
    <div class="mask">
        <div class="left"  @click="prevPage"></div>
        <div class="center" @click="toggleTitleAndMenushow"></div>
        <div class="right "@click="nextPage"></div>
    </div>
</div>
<menu-bar :ifTitleAndMenushow="ifTitleAndMenushow" :fontSizeList="fontSizeList" :defaultFontSize="defaultFontSize" @setFontSize="setFontSize" :themeList="themeList" :defaultTheme="defaultTheme" @setTheme="setTheme" :bookAvailable="bookAvailable"  @onProgressChange="onProgressChange" @jumpTo="jumpTo" :navigation="navigation" ref="menuBar"
></menu-bar>

  </div>
</template>

<script>
import TitleBar from '@/components/TitleBar'
import MenuBar from '@/components/MenuBar'
import Epub from 'epubjs'
const urlm='/static/2018_Book_AgileProcessesInSoftwareEngine.epub'
global.epub = Epub
export default {
    components: {
      cd  TitleBar,
        MenuBar
    },
    data() {
        return{
        ifTitleAndMenushow:false,
        fontSizeList: [
            {fontSize:12},
            {fontSize:14},
            {fontSize:16},
            {fontSize:18},
            {fontSize:20},
            {fontSize:22},
            {fontSize:24},

        ],
        defaultFontSize:16 ,
        defaultTheme:0,
        bookAvailable:false,
        navigation:{},
        themeList:[
            {
                name:'default',
                style:{
                    body:{
                        'color':'#000','background':'#fff'
                    }
   }

            },
            {
                name:'eye',
                style:{
                    body:{
                        'color':'#000','background':'#ceeaba'
                    }

                }

            },
            {
                name:'night',
                style:{
                    body:{
                        'color':'#fff','background':'#000'
                    }

                }

            },
            {
                name:'gold',
                style:{
                    body:{
                        'color':'#000','background':'rgb(241,236,226)'
                    }

                },

            },

            
        ]
        }
    },

    methods:{
        jumpTo(href){
            this.rendition.display(href)
            this.hideTitleAndMenu()
        },
        hideTitleAndMenu(){
            this.ifTitleAndMenushow=false
            this.$refs.menuBar.hideSetting()
            this.$refs.menuBar.hideContent()


        }
        ,
        onProgressChange(progress){
            const percentage=progress/100
            const location =percentage>0? this.locations.cfiFromPercentage(percentage):0
            this.rendition.display(location)
        },
        setTheme(index){
            this.themes.select(this.themeList[index].name)
            this.defaultTheme=index

        },
        registerTheme(){
            this.themeList.forEach(theme =>{
                this.themes.register(theme.name ,theme.style)
                
            })

        },
        setFontSize(fontSize) {
           this.defaultFontSize=fontSize
           if(this.themes){
               this.themes.fontSize(fontSize+'px')
           }
        }
        ,
        prevPage() {
            if (this.rendition) {
                this.rendition.prev()
                 }
        },
        nextPage() {
            if (this.rendition) {
                this.rendition.next()
                 }
        },
        toggleTitleAndMenushow() {
            this.ifTitleAndMenushow=!this.ifTitleAndMenushow
            if(!this.ifTitleAndMenushow){
                this.$refs.menuBar.hideSetting()
            }
        },
        showEpub() {
            this.book= new Epub(urlm)
            console.log(this.book)
            this.rendition=this.book.renderTo('read',{
                width:window.innerWidth,
                height:window.innerHeight
            })
            this.rendition.display()
            this.themes=this.rendition.themes
            this.setFontSize(this.defaultFontSize)
            this.registerTheme()
            this.setTheme(this.defaultTheme)
            this.book.ready.then(()=>{
                this.navigation=this.book.navigation
                console.log(this.navigation)
                return this.book.locations.generate()
            }).then(result =>{
                this.locations=this.book.locations
                this.bookAvailable =true
                
            })
        
    },
    },
        mounted() {
            this.showEpub()
        }
    
  
}
</script>


<style lang="scss" scoped>
@import 'assets/styles/global';
.ebook {
    position:relative;
    
    .read-wrapper {
        .mask{
            position:absolute;
            top:0;
            left:0;
            z-index:100;
            display:flex;
            width:100%;
            height:100%;
            .left{
                flex:0 0 px2rem(100);
                
                
            }
            .center{
                flex:1;
               
            }
            .right{
                flex:0 0 px2rem(100);
                 
                  
            }
        }
    }
    
}
</style>




