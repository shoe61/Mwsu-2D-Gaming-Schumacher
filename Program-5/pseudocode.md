carveMaze(x,y){
  //Pick a random direction
  
  if(//map.getTile(x,y-2).index ==0 && direction is north)
  {
    //remove tile(x,y-1) and tile(x,y-2)
    carveMaze(x, y-2)
  }  
  if(//map.getTile(x,y+2).index ==0 && direction is south)
  {
    //remove tile(x,y+1) and tile(x,y+2)
    carveMaze(x, y+2)
  }
  if(//map.getTile(x-2,y).index ==0 && direction is west)
  {
    //remove tile(x-2,y) and tile(x-1,y)
    carveMaze(x-2,y)
  }
  if(//map.getTile(x+2,y).index ==0 && direction is east)
  {
    //remove tile(x+2,y) and tile(x+1,y)
    carveMaze(x+2,y)
  }
  
  //do the same thing as above if random spot is not availible in all available directions.
  if(//map.getTile(x,y-2).index ==0)
  {
    //remove tile(x,y-1) and tile(x,y-2)
    carveMaze(x, y-2)
  }  
  if(//map.getTile(x,y+2).index ==0)
  {
    //remove tile(x,y+1) and tile(x,y+2)
    carveMaze(x, y+2)
  }
  if(//map.getTile(x-2,y).index ==0)
  {
    //remove tile(x-2,y) and tile(x-1,y)
    carveMaze(x-2,y)
  }
  if(//map.getTile(x+2,y).index ==0)
  {
    //remove tile(x+2,y) and tile(x+1,y)
    carveMaze(x+2,y)
  }
}  
  
