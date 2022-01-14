status1 = ""; 
objects = [];

function preload(){
}

function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetecter = ml5.objectDetector('cocossd',modelloaded);
    document.getElementById("status").innerHTML = "Model is detecting objects";

}

function modelloaded(){
    console.log("MODEL HAS LOADED SUCCESFULLY !!");
    status1 = true;
  }

function gotresults(error,results){
    if(error){
        console.log(error);
    }

    else{
        console.log(results);
        objects = results;
    }
}


function draw(){
    image(video,0,0,380,380);

   if(status1 !=""){
        objectDetecter.detect(video,gotresults);
        r = random(255);
        g = random(255);
        b = random(255);
        for (i = 0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "Objects Detected !! ";
            document.getElementById("noo").innerHTML = "Number of Objects Detected Are " + objects.length;
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "  " + percent + " %  ", objects[i].x + 20 , objects[i].y + 30);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }


}