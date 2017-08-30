let React=require('react');
let $=require('jquery');
require('./App.css');


class Run extends React.Component{

  constructor(props) {
    super(props);
    this.state={
       change:false
    }
    this.handleStart=this.handleStart.bind(this);
    this.handleStop=this.handleStop.bind(this);
    this.handlePlay=this.handlePlay.bind(this);
  }

  handlePlay() {
    
    $('.sm-box').each(function() {
      $(this).css('background','black');
    })
    $('.sm-box').on('click',function() {
      $(this).css('background','orange');
    })
  }

  handleStart() {
    if(this.state.change!==true){
       this.setState({change:true});      
    }
  }

  handleStop() {
   this.setState({change:false });
  }

  componentWillUpdate(nextProps,nextState) {
  
  function giveCount(id) {
    let neighCount; let neighbors={};
    let x; let y; let subY;
    let subX; let addX; 
    let addY; let temp;

        neighCount=0;
          x=Number(id.split('-')[1]);
          y=Number(id.split('-')[2]);   
             subX=x-1;
             addX=x+1;
             subY=y-1;
             addY=y+1;
              if(subX===0) {
                subX=null;
              }
              if(subY===0) {
                subY=null;
              }
              if(addX===51) {
                addX=null;
              }
              if(addY===51) {
                addY=null;
              }

          neighbors={
            left:x+'-'+subY,
            right:x+'-'+addY,
            up:subX+'-'+y,
            down:addX+'-'+y,
            topleft:subX+'-'+subY,
            topright:subX+'-'+addY,
            bottomleft:addX+'-'+subY,
            bottomright:addX+'-'+addY 
          };

         Object.keys(neighbors).map((cell) =>{
            temp=neighbors[cell];
            temp=temp.split('-');
           
            if(temp[0]!=='null' && temp[1]!=='null') {

              let boxId='box_no-'+temp[0]+'-'+temp[1];
              let getColor=document.getElementById(boxId);
              if(getColor.style.background==='orange') {
                neighCount+=1;
              }             
            }
          })
         return neighCount;
    }


    function resolve(fromResolve) {
    let count=giveCount(fromResolve);
      if(count<=1 || count>=4) {
        $('#'+fromResolve).addClass("remove");
      }          
    }

    function reject(fromReject) {
    let count=giveCount(fromReject);

      if(count===3) {
        $('#'+fromReject).addClass("alive");
      } 
    }
 
    if(nextState.change) {
      this.interval=window.setInterval(function() {
        $('.sm-box').each(function() { 
          let id; let color;
          id=$(this).attr('id');
          color=document.getElementById(id);
          if(color.style.background==='orange') {
            resolve(id);
          } else {
            reject(id);
          }
        });
        $('.sm-box').each(function() {

          if($(this).hasClass("remove")) {
            $(this).removeClass("remove");
            $(this).css('background','black');
          }
          if($(this).hasClass("alive")) {
            $(this).removeClass("alive");
            $(this).css('background','orange');
          }
        });

      },100);

      
    } else {
      console.log('inside else');
        window.clearInterval(this.interval);
    }
  }

  render() {
    return (
    <div>
      <div className='buttons'>
        <button onClick={()=>{this.handleStart()}}> 
          Start  
        </button>

        <button onClick={()=>{this.handleStop()}}> 
          Stop  
        </button>
      </div>
      <div>
        <button onClick={()=>{this.handlePlay()}} >
          Play
        </button>
      </div>
    </div>
    )
  }
}


class Onload extends React.Component{
  componentDidMount() {
    let row=Math.floor(Math.random()*50+1);
    let col=Math.floor(Math.random()*50+1);
    let boxId='#box_no-'+row+'-'+col;
    let i=0;
    while(i<300) {
       $(boxId).css('background','orange');
        row=Math.floor(Math.random()*50+1);
        col=Math.floor(Math.random()*50+1);
        boxId='#box_no-'+row+'-'+col;
       i++;
    }
  }
  render() {
    return (
      <div>
      </div>
    )
  }
}

class MakeGrid extends React.Component {
  componentDidMount() {
    for(let i=1;i<51;i++)
    { 
      for(let j=1;j<51;j++)
      {
        $('#grid').append('<div class="sm-box"  id="box_no-'+i+"-"+j+'"></div>');
      }
    }
  }
  render() {
    return (
      <div>
        <div id='grid'>
        </div> 
      </div>
    )
  }
}


class App extends React.Component {

  render() {
    return (
      <div>
       
        <h1>The Game of Life </h1>
        <MakeGrid />
        <Onload /> 
        <Run />
      </div>
    );
  }
}

module.exports=App;
