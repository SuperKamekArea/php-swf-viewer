/* SuperKamekArea
 * July 18, 2021
 *
 * Remaining problems:
 *   I only have this to avoid hotlinking to a bookarklet website
 */

(function () {

setTimeout(initFlashControls, 100);

function initFlashControls()
{
  var count = 0;

  function tt(elem)
  {
    if (typeof elem.TotalFrames != "undefined") /* do not coerce elem.StopPlay to bool, because that breaks IE2 */
    {
      addFlashControls(elem);
      ++count;
    }
  }

  var i, x;

  for (i = 0; x = document.getElementsByTagName("object")[i]; ++i)
    tt(x);

  for (i = 0; x = document.getElementsByTagName("embed")[i]; ++i)
    tt(x);

  if (!count) alert ("No scriptable flash on this page.");
}


function addFlashControls(flash)
{
  var controlsDiv = document.createElement("div");

  /* Put the controls under the Flash. 
   *
   * If the Flash is an <embed> in an <object>, we do not want to touch the <object>, because that would make
   * Mozilla re-test whether the <object> is broken and reset the <embed>.  So in that case, we put the controls
   * under the <object>.
   */
  var where = flash;
  while (where.parentNode.tagName.toLowerCase() == "object")
    where = where.parentNode;
  where.parentNode.insertBefore(controlsDiv, where.nextSibling);

  /* Construct controls using DOM2 instead of innerHTML.
   * In Mozilla, innerHTML= is like innerText= at standalone flash URLs.
   */
  var table = document.createElement("table");
  controlsDiv.appendChild(table);
  
  var row = table.insertRow(-1);
  
  var pauseButton = document.createElement("button");
  pauseButton.appendChild(document.createTextNode("Pause"));
  var buttonCell = row.insertCell(-1);
  buttonCell.appendChild(pauseButton);
  
  var slider = row.insertCell(-1);
  slider.width = "100%";
  
  var visibleSlider = document.createElement("div");
  visibleSlider.style.position = "relative";
  visibleSlider.style.height = "10px";
  visibleSlider.style.width = "100%";
  visibleSlider.style.MozBorderRadius = "4px";
  visibleSlider.style.background = "#aaa";
  slider.appendChild(visibleSlider);
  
  var thumb = document.createElement("div");
  thumb.style.position = "absolute";
  thumb.style.height = "20px";
  thumb.style.width = "10px";
  thumb.style.top = "-5px";
  thumb.style.MozBorderRadius = "4px";
  thumb.style.background = "#666";
  visibleSlider.appendChild(thumb);
  

  var sliderWidth;
  var paused = false;
  var dragging = false;

  table.width = Math.max(parseInt(flash.width) || 0, 400);
  
  addEvent(pauseButton, "click", pauseUnpause);
  addEvent(slider, "mousedown", drag);
  addEvent(slider, "drag", function() { return false; }); /* For IE2 */
  window.setInterval(update, 30);

  function pauseUnpause()
  {
    paused = !paused;

    pauseButton.style.borderStyle = paused ? "inset" : "";

    if (paused)
      flash.StopPlay();
    else
      flash.Play();
  }

  function update()
  {
    sliderWidth = parseInt(getWidth(slider) - getWidth(thumb));

    if (!paused && !dragging)
      thumb.style.left = parseInt(flash.CurrentFrame() / totalFrames() * sliderWidth) + "px";
  }

  function dragMousemove(e)
  {
    var pageX = e.clientX + document.body.scrollLeft; /* cross-browser, unlike e.pageX, which IE2 does not support */
    var pos = bounds(0, pageX - getX(slider) - 5, sliderWidth);
    var frame = bounds(1, Math.ceil(totalFrames() * pos / sliderWidth), totalFrames() - 2);

    thumb.style.left = pos + "px";

    flash.GotoFrame(frame);
  }

  function release(e)
  {
    removeEvent(document, "mousemove", dragMousemove);
    removeEvent(document, "mouseup", release);
    if (!paused)
      flash.Play();
    dragging = false;
  }

  function drag(e)
  {
    addEvent(document, "mousemove", dragMousemove);
    addEvent(document, "mouseup", release);
    dragging = true;
    dragMousemove(e);
  }



  /* Boring functions, some of which only exist to hide differences between IE2 and Mozilla. */

  function bounds(min, val, max)
  {
    return Math.min(Math.max(min, val), max);
  }

  function totalFrames()
  {
    /* This is weird.  TotalFrames differs between IE2 and Mozilla.  CurrentFrame does not. */

    if (typeof flash.TotalFrames == "number")
      return flash.TotalFrames; /* IE2 */
    else if (typeof flash.TotalFrames == "function")
      return flash.TotalFrames(); /* Mozilla */
    else
      return 1; /* Partially loaded Flash in IE2? */
  }

  function getWidth(elem)
  {
    if (document.defaultView && document.defaultView.getComputedStyle)
      return parseFloat(document.defaultView.getComputedStyle(elem,null).getPropertyValue("width")); /* Mozilla */
    else
      return parseFloat(elem.offsetWidth); /* IE2 (currentStyle.width can be "auto" or "100%") */
  }

  function getX(elem)
  {
    if (!elem) return 0;
    return (elem.offsetLeft) + getX(elem.offsetParent);
  }

  function addEvent(elem, eventName, fun)
  {
    if (elem.addEventListener) /* Mozilla */
      elem.addEventListener(eventName, fun, false);
    else /* IE2 */
      elem.attachEvent("on" + eventName, fun);
  }

  function removeEvent(elem, eventName, fun)
  {
    if (elem.addEventListener)
      elem.removeEventListener(eventName, fun, false);
    else
      elem.detachEvent("on" + eventName, fun);
  }

}

})()
