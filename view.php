<html>
<center><img src=viewlogo.png width=100% id="logo" style="max-width: 800px;"><br />
<style>
#logo {
_width:expression(this.scrollWidth > 800 ? "800px" : "auto");
}
</style>
<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width=<?php
  echo $_GET["width"]; #width
?> height=<?php
  echo $_GET["height"]; #height
?> id="androidvsapple" align="middle">
<param name="allowScriptAccess" value="sameDomain" />
<param name="movie" value=<?php
  echo $_GET["file"]; #file
?> /><param name="loop" value="false" /><param name="quality" value=<?php
  echo $_GET["quality"]; #quality
?> /><param name="bgcolor" value="#ffffff" /><embed src=<?php
  echo $_GET["file"]; #file
?> loop="false" quality=<?php
  echo $_GET["quality"]; #quality
?> bgcolor="#ffffff" width=<?php
  echo $_GET["width"]; #width
?> height=<?php
  echo $_GET["height"]; #height
?> name="androidvsapple" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />
</object>
<script src='seekbar.js'></script>
<?php
  echo '<br />'; #newline
  echo 'File name: '; # file_indicator
  echo $_GET["file"]; # file
  echo '<br />'; #newline
  echo 'Quality: '; # quality_indicator
  echo $_GET["quality"]; #quality
  echo '<br />'; #newline
  echo 'Resolution (in pixels): '; #res
  echo $_GET["width"]; #width
  echo 'x'; #resseperator
  echo $_GET["height"]; #height
?><br />