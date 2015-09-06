// Copyright (c) 2015 ZeytinSoft - Arda Zeytin
//
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//
// Prerequisite:
// First, create at least a 1024x1024 px PNG file according to:
//
// Install - Save Create Icons.jsx to:
//   Win: C:\Program Files\Adobe\Adobe Photoshop CC 2014\Presets\Scripts
//   Mac: /Applications/Utilities/Adobe Utilities/ExtendScript Toolkit CS5/SDK
// * Restart Photoshop
//
// Run:
// * With Photoshop open, select File > Scripts > SquarePNGgenarator
//
// Adobe Photoshop JavaScript Reference
// http://www.adobe.com/devnet/photoshop/scripting.html

// Turn debugger on. 0 is off.
// $.level = 1;

try
{

  var squareGenerator = File.openDialog("Select a sqaure PNG file that is at least 1024x1024.", "*.png", false);

  if (squareGenerator !== null)
  {
    var doc = open(squareGenerator, OpenDocumentType.PNG);

    if (doc == null)
    {
      throw "Something is wrong with the file.  Make sure it's a valid PNG file.";
    }

    var startState = doc.activeHistoryState;       // save for undo
    var initialPrefs = app.preferences.rulerUnits; // will restore at end
    app.preferences.rulerUnits = Units.PIXELS;     // use pixels

    if (doc.width != doc.height)
    {
        throw "Image is not square";
    }
    else if ((doc.width < 1024) && (doc.height < 1024))
    {
        throw "Image is too small!  Image must be at least 1024x1024 pixels.";
    }
    else if (doc.width < 1024)
    {
        throw "Image width is too small!  Image width must be at least 1024 pixels.";
    }
    else if (doc.height < 1024)
    {
        throw "Image height is too small!  Image height must be at least 1024 pixels.";
    }

    // Folder selection dialog
    var destFolder = Folder.selectDialog( "Choose an output folder");

    if (destFolder == null)
    {
      // User canceled, just exit
      throw "";
    }

    // Save icons in PNG using Save for Web.
    var sfw = new ExportOptionsSaveForWeb();
    sfw.format = SaveDocumentType.PNG;
    sfw.PNG8 = false;
    sfw.transparency = true;
    doc.info = null;

    //Edit here
    var icons = [
      {"name": "square1024", "size":1024},
      {"name": "square620",  "size":620},
      {"name": "square310",  "size":310},
      {"name": "square465",  "size":465},
      {"name": "square388",  "size":388},
      {"name": "square176",  "size":176},
      {"name": "square88",   "size":88},
      {"name": "square44",   "size":44},
      {"name": "square66",   "size":66},
      {"name": "square55",   "size":55},
      {"name": "square256",  "size":256},
      {"name": "square48",   "size":48},
      {"name": "square24",   "size":24},
      {"name": "square16",   "size":16},
      {"name": "square600",  "size":600},
      {"name": "square300",  "size":300},
      {"name": "square150",  "size":150},
      {"name": "square225",  "size":225},
      {"name": "square188",  "size":188},
      {"name": "square284",  "size":284},
      {"name": "square142",  "size":142},
      {"name": "square71",   "size":71},
      {"name": "square107",  "size":107},
      {"name": "square89",   "size":89},
      {"name": "square96",   "size":96},
      {"name": "square48",   "size":48},
      {"name": "square36",   "size":36},
      {"name": "square30",   "size":30},
      {"name": "square24",   "size":24},
    ];

    var icon;
    for (i = 0; i < icons.length; i++)
    {
      icon = icons[i];
      doc.resizeImage(icon.size, icon.size, // width, height
                      null, ResampleMethod.BICUBICSHARPER);

      var destFileName = icon.name + ".png";

      if ((icon.name == "square1024") || (icon.name == "square620"))
      {

        destFileName = icon.name;
      }

      doc.exportDocument(new File(destFolder + "/" + destFileName), ExportType.SAVEFORWEB, sfw);
      doc.activeHistoryState = startState; // undo resize
    }

    alert("Icons created!");
  }
}
catch (exception)
{
  // Show degbug message and then quit
	if ((exception != null) && (exception != ""))
    alert(exception);
 }
finally
{
    if (doc != null)
        doc.close(SaveOptions.DONOTSAVECHANGES);

    app.preferences.rulerUnits = initialPrefs; // restore prefs
}
