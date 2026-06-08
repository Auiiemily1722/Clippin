const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const FONT_PATH = "C:/Windows/Fonts/simhei.ttf";
const FONT_BOLD_PATH = "C:/Windows/Fonts/simhei.ttf";
const OUTPUT_PATH = path.join(__dirname, "PinClip_User_Guide.pdf");

function generateCover(doc) {
  doc.rect(0, 0, 595.28, 841.89).fill("#0f1a2e");
  doc.circle(480, 150, 180).fillOpacity(0.06).fill("#4299e1");
  doc.circle(100, 700, 130).fillOpacity(0.06).fill("#4299e1");
  doc.circle(500, 600, 100).fillOpacity(0.04).fill("#63b3ed");
  doc.rect(54, 280, 80, 4).fillOpacity(1).fill("#4299e1");
  doc.fontSize(48).fillColor("#ffffff").text("PinClip", 54, 310);
  doc.fontSize(22).fillColor("#a0aec0").text("\u8F7B\u91CF\u7EA7\u526A\u8D34\u677F\u5386\u53F2\u8BB0\u5F55\u5DE5\u5177", 54, 370);
  doc.fontSize(14).fillColor("#718096").text("\u7248\u672C 1.2.1", 54, 420);
  doc.fontSize(11).fillColor("#a0aec0").text("\u5B9E\u65F6\u76D1\u542C  \u00B7  \u5FEB\u901F\u641C\u7D22  \u00B7  \u591A\u8BED\u8A00\u652F\u6301  \u00B7  \u6DF1\u8272\u6A21\u5F0F", 54, 460);
  doc.fontSize(10).fillColor("#4a5568").text("PinClip Studio", 54, 761.89);
  doc.fontSize(10).fillColor("#4a5568").text("2025 \u7248\u6743\u6240\u6709", 54, 776.89);
}

function addPageHeader(doc, title, pageNum) {
  doc.roundedRect(54, 20, 487.28, 1, 0.5).fill("#e2e8f0");
  doc.fontSize(8).fillColor("#a0aec0").text("PinClip \u7528\u6237\u624B\u518C", 54, 26);
  doc.fontSize(8).fillColor("#a0aec0").text("\u7B2C " + pageNum + " \u9875", 54, 26, { align: "right", width: 487.28 });
}

function addPageFooter(doc) {
  doc.roundedRect(54, 801.89, 487.28, 1, 0.5).fill("#e2e8f0");
}

function writeChapter(doc, chNum, title, sections) {
  doc.addPage();
  doc.rect(0, 0, 595.28, 841.89).fill("#ffffff");
  doc.fontSize(28).fillColor("#1a365d").text("\u7B2C " + chNum + " \u7AE0", 54, 100);
  doc.fontSize(20).fillColor("#1a365d").text(title, 54, 145);
  doc.rect(54, 180, 60, 3).fill("#2b6cb0");
  
  let pageNum = parseInt(chNum) + 2;
  sections.forEach(function(s, idx) {
    doc.addPage();
    doc.rect(0, 0, 595.28, 841.89).fill("#ffffff");
    addPageHeader(doc, chNum + "." + (idx+1) + " " + s.title, pageNum);
    doc.fontSize(18).fillColor("#1a365d").text(chNum + "." + (idx+1) + "  " + s.title, 54, 50);
    doc.rect(54, 78, 40, 2.5).fill("#2b6cb0");
    doc.fontSize(11).fillColor("#2d3748").text(s.body, 54, 100, { lineGap: 6, paragraphGap: 4, width: 487.28 });
    if (s.tip) {
      var tipY = doc.y + 12;
      if (tipY > 700) { tipY = 100; doc.addPage(); doc.rect(0,0,595.28,841.89).fill("#ffffff"); addPageHeader(doc, chNum + "." + (idx+1) + " " + s.title, pageNum); }
      doc.roundedRect(54, tipY, 487.28, 60, 4).fillOpacity(0.08).fill("#2b6cb0").fillOpacity(1);
      doc.roundedRect(54, tipY, 487.28, 60, 4).lineWidth(1).strokeOpacity(0.3).stroke("#2b6cb0").strokeOpacity(1);
      doc.fontSize(9).fillColor("#2b6cb0").text("\uD83D\uDCA1 \u63D0\u793A\uFF1A", 64, tipY + 8);
      doc.fontSize(10).fillColor("#2d3748").text(s.tip, 64, tipY + 24, { lineGap: 4, width: 467.28 });
    }
    addPageFooter(doc);
    pageNum++;
  });
}

function main() {
  var doc = new PDFDocument({ size: "A4", margins: { top: 54, bottom: 54, left: 54, right: 54 }, info: { Title: "PinClip User Guide", Author: "PinClip Studio" } });
  doc.registerFont("YaHei", "C:/Windows/Fonts/simhei.ttf");
  doc.registerFont("YaHei-B", "C:/Windows/Fonts/simhei.ttf");
  doc.font("YaHei");
  
  var ws = fs.createWriteStream("C:\\Users\\22816\\Desktop\\codextest\\PinClip\\PinClip_User_Guide.pdf");
  doc.pipe(ws);
  
  generateCover(doc);
  
  // TOC
  doc.addPage();
  doc.rect(0,0,595.28,841.89).fill("#ffffff");
  doc.fontSize(28).fillColor("#1a365d").text("\u76EE\u5F55", 54, 50);
  doc.rect(54,90,60,3).fill("#2b6cb0");
  var toc = [["1","\u5FEB\u901F\u5165\u95E8"],["2","\u526A\u8D34\u677F\u7BA1\u7406"],["3","\u641C\u7D22\u4E0E\u7B5B\u9009"],["4","\u4E2A\u6027\u5316\u8BBE\u7F6E"],["5","\u7A97\u53E3\u4E0E\u7CFB\u7EDF\u6258\u76D8"],["6","\u6570\u636E\u7BA1\u7406"]];
  var y = 120;
  for (var i = 0; i < toc.length; i++) {
    doc.fontSize(12).fillColor("#2d3748").text(toc[i][0] + ".  " + toc[i][1], 84, y);
    doc.fontSize(12).fillColor("#2b6cb0").text("" + (i+3), 54, y, { align: "right", width: 487.28 });
    y += 36;
  }
  doc.fontSize(12).fillColor("#2d3748").text("\u5E38\u89C1\u95EE\u9898 (FAQ)", 109, y);
  doc.fontSize(12).fillColor("#2b6cb0").text("9", 54, y, { align: "right", width: 487.28 });
  y += 36;
  doc.fontSize(12).fillColor("#2d3748").text("\u9644\u5F55\uFF1A\u6280\u672F\u89C4\u683C", 109, y);
  doc.fontSize(12).fillColor("#2b6cb0").text("10", 54, y, { align: "right", width: 487.28 });
  
  // Chapter 1
  writeChapter(doc, "1", "\u5FEB\u901F\u5165\u95E8", [
    { title: "\u5B89\u88C5\u4E0E\u542F\u52A8", body: "PinClip \u662F\u4E00\u6B3E\u8F7B\u91CF\u7EA7\u7684\u526A\u8D34\u677F\u5386\u53F2\u8BB0\u5F55\u5DE5\u5177\uFF0C\u652F\u6301 Windows \u5E73\u53F0\u3002\u5B89\u88C5\u65B9\u5F0F\uFF1A\u4FBF\u643A\u7248\uFF08.exe\uFF09\u4E0B\u8F7D\u540E\u76F4\u63A5\u8FD0\u884C\uFF1B\u5B89\u88C5\u7248\uFF08NSIS\uFF09\u8FD0\u884C\u5B89\u88C5\u7A0B\u5E8F\u6309\u5411\u5BFC\u5B8C\u6210\u3002\u542F\u52A8\u65B9\u5F0F\uFF1A\u53CC\u51FB\u684C\u9762\u5FEB\u6377\u65B9\u5F0F\uFF0C\u6216\u7528\u5168\u5C40\u5FEB\u6377\u952E Ctrl+Shift+V \u547C\u51FA\u4E3B\u7A97\u53E3\u3002\u9996\u6B21\u542F\u52A8\u65F6\u81EA\u52A8\u5F00\u59CB\u76D1\u542C\u526A\u8D34\u677F\uFF0C\u6240\u6709\u6570\u636E\u5B58\u50A8\u5728\u672C\u5730 SQLite \u6570\u636E\u5E93\u4E2D\u3002", tip: "\u4FBF\u643A\u7248\u9002\u5408\u653E\u5728 U \u76D8\u4E2D\u4F7F\u7528\uFF0C\u5B89\u88C5\u7248\u652F\u6301\u5F00\u673A\u81EA\u542F\u52A8\u3002" },
    { title: "\u754C\u9762\u6982\u89C8", body: "\u4E3B\u754C\u9762\u5206\u4E3A\uFF1A\u6807\u9898\u680F\uFF08\u663E\u793A\u540D\u79F0\u548C\u7A97\u53E3\u63A7\u5236\u6309\u94AE\uFF09\u3001\u641C\u7D22\u680F\uFF08\u5B9E\u65F6\u8FC7\u6EE4\uFF09\u3001\u65E5\u671F\u7B5B\u9009\u680F\uFF08\u5168\u90E8/\u4ECA\u5929/\u6628\u5929/\u524D\u5929/\u66F4\u65E9\u524D\uFF09\u3001\u5185\u5BB9\u5217\u8868\uFF08\u5361\u7247\u5F62\u5F0F\u663E\u793A\uFF09\u3001\u5E95\u90E8\u72B6\u6001\u680F\u3002\u7A97\u53E3\u53EF\u62D6\u62FD\u8FB9\u7F18\u81EA\u7531\u8C03\u6574\u5927\u5C0F\u3002", tip: "\u7A97\u53E3\u53EF\u4EE5\u62D6\u62FD\u8FB9\u7F18\u81EA\u7531\u8C03\u6574\u5927\u5C0F\uFF0C\u5185\u5BB9\u5217\u8868\u4F1A\u81EA\u52A8\u9002\u914D\u3002" },
    { title: "\u57FA\u672C\u64CD\u4F5C", body: "\u590D\u5236\uFF1A\u70B9\u51FB\u5361\u7247\u6216\u590D\u5236\u6309\u94AE\uFF0C\u5185\u5BB9\u81EA\u52A8\u590D\u5236\u5230\u526A\u8D34\u677F\uFF0C\u663E\u793A\u52FE\u53F7\u52A8\u753B\u3002\u7F6E\u9876\uFF1A\u70B9\u51FB\u56FE\u9489\u56FE\u6807\uFF0C\u7F6E\u9876\u8BB0\u5F55\u59CB\u7EC8\u663E\u793A\u5728\u6700\u4E0A\u65B9\u3002\u5220\u9664\uFF1A\u70B9\u51FB\u5220\u9664\u6309\u94AE\uFF0C\u6DE1\u51FA\u52A8\u753B\u6D88\u5931\u3002\u5173\u95ED\u7A97\u53E3\uFF1A\u70B9\u51FB\u7EA2\u8272\u6309\u94AE\u6216 Esc \u952E\u3002", tip: "\u7F6E\u9876\u7684\u5185\u5BB9\u4E0D\u4F1A\u88AB\u81EA\u52A8\u6E05\u7406\uFF0C\u9002\u5408\u4FDD\u5B58\u91CD\u8981\u4FE1\u606F\u3002" },
  ]);
  
  // Chapter 2
  writeChapter(doc, "2", "\u526A\u8D34\u677F\u7BA1\u7406", [
    { title: "\u81EA\u52A8\u8BB0\u5F55\u673A\u5236", body: "\u91C7\u7528 Windows \u539F\u751F API\uFF08AddClipboardFormatListener\uFF09\u5B9E\u73B0\u4E8B\u4EF6\u9A71\u52A8\u7684\u526A\u8D34\u677F\u76D1\u542C\u3002\u652F\u6301\u8BB0\u5F55\u7EAF\u6587\u672C\u3001\u5BCC\u6587\u672C\u548C\u56FE\u7247\uFF08PNG/JPEG\uFF09\u3002\u6BCF\u6761\u8BB0\u5F55\u81EA\u52A8\u4FDD\u5B58\u65F6\u95F4\u6233\u3002", tip: "\u4E8B\u4EF6\u9A71\u52A8\u76D1\u542C\u6BD4\u8F6E\u8BE2\u66F4\u7701\u7535\u66F4\u9AD8\u6548\uFF0C\u4E0D\u5360\u7528\u989D\u5916 CPU \u8D44\u6E90\u3002" },
    { title: "\u590D\u5236\u4E0E\u4F7F\u7528\u5386\u53F2\u5185\u5BB9", body: "\u547C\u51FA\u7A97\u53E3\uFF08Ctrl+Shift+V\uFF09\uFF0C\u6D4F\u89C8\u5217\u8868\u627E\u5230\u76EE\u6807\u5185\u5BB9\uFF0C\u70B9\u51FB\u5361\u7247\u5373\u53EF\u590D\u5236\u3002\u590D\u5236\u6309\u94AE\u663E\u793A \u2713 \u52FE\u53F7\u52A8\u753B\u786E\u8BA4\u3002\u590D\u5236\u540E\u81EA\u52A8\u6700\u5C0F\u5316\u5230\u6258\u76D8\uFF0C\u65B9\u4FBF\u76F4\u63A5\u7C98\u8D34\u3002", tip: "\u53EF\u5728\u8BBE\u7F6E\u4E2D\u5173\u95ED\u201C\u590D\u5236\u540E\u6700\u5C0F\u5316\u201D\u9009\u9879\u3002" },
    { title: "\u7F6E\u9876\u4E0E\u5220\u9664", body: "\u7F6E\u9876\uFF1A\u70B9\u51FB\u56FE\u9489\u56FE\u6807\uFF0C\u4F7F\u7528 FLIP \u52A8\u753B\u3002\u7F6E\u9876\u8BB0\u5F55\u4E0D\u4F1A\u88AB\u5B9A\u671F\u6E05\u7406\u3002\u5220\u9664\uFF1A\u70B9\u51FB\u5220\u9664\u6309\u94AE\uFF0C\u6DE1\u51FA\u52A8\u753B\u6D88\u5931\u3002\u4E5F\u53EF\u5728\u591A\u9009\u6A21\u5F0F\u4E0B\u6279\u91CF\u5220\u9664\u3002", tip: "\u957F\u6309\u6216\u53F3\u952E\u5361\u7247\u53EF\u89E6\u53D1\u66F4\u591A\u64CD\u4F5C\u9009\u9879\u3002" },
  ]);
  
  // Chapter 3
  writeChapter(doc, "3", "\u641C\u7D22\u4E0E\u7B5B\u9009", [
    { title: "\u5B9E\u65F6\u641C\u7D22", body: "\u5728\u641C\u7D22\u6846\u8F93\u5165\u5173\u952E\u8BCD\u5373\u53EF\u5B9E\u65F6\u8FC7\u6EE4\u3002\u652F\u6301\u4E2D\u82F1\u65E5\u591A\u8BED\u8A00\u641C\u7D22\u548C\u6B63\u5219\u8868\u8FBE\u5F0F\u3002\u641C\u7D22\u7ED3\u679C\u9AD8\u4EAE\u663E\u793A\u5339\u914D\u6587\u5B57\u7247\u6BB5\u3002", tip: "\u6B63\u5219\u8868\u8FBE\u5F0F\u793A\u4F8B\uFF1A\u8F93\u5165 ^http \u641C\u7D22\u6240\u6709\u4EE5 http \u5F00\u5934\u7684\u8BB0\u5F55\u3002" },
    { title: "\u65E5\u671F\u7B5B\u9009", body: "\u4E0B\u62C9\u83DC\u5355\u9009\u62E9\u7B5B\u9009\u6761\u4EF6\uFF1A\u5168\u90E8\u3001\u4ECA\u5929\u3001\u6628\u5929\u3001\u524D\u5929\u3001\u66F4\u65E9\u524D\u3002\u53EF\u4E0E\u641C\u7D22\u529F\u80FD\u53E0\u52A0\u4F7F\u7528\u3002", tip: "\u65E5\u671F\u7B5B\u9009\u57FA\u4E8E\u8BB0\u5F55\u65F6\u95F4\u6233\uFF0C\u5FEB\u901F\u67E5\u627E\u5F53\u5929\u590D\u5236\u7684\u5185\u5BB9\u3002" },
  ]);
  
  // Chapter 4
  writeChapter(doc, "4", "\u4E2A\u6027\u5316\u8BBE\u7F6E", [
    { title: "\u591A\u8BED\u8A00\u5207\u6362", body: "\u652F\u6301\u7B80\u4F53\u4E2D\u6587\u3001\u7E41\u4F53\u4E2D\u6587\u3001\u65E5\u6587\u3001\u82F1\u6587\u3002\u901A\u8FC7\u6258\u76D8\u53F3\u952E\u83DC\u5355\u4E2D\u7684\u201C\u8BED\u8A00\u201D\u5B50\u83DC\u5355\u5207\u6362\uFF0C\u5373\u65F6\u751F\u6548\u3002", tip: "\u8BED\u8A00\u8BBE\u7F6E\u81EA\u52A8\u4FDD\u5B58\uFF0C\u4E0B\u6B21\u542F\u52A8\u6CBF\u7528\u3002" },
    { title: "\u6DF1\u8272/\u6D45\u8272\u6A21\u5F0F", body: "\u9ED8\u8BA4\u8DDF\u968F\u7CFB\u7EDF\u3002\u901A\u8FC7\u6258\u76D8\u83DC\u5355\u201C\u5916\u89C2\u201D\u5207\u6362\uFF0C\u652F\u6301\u6DF1\u8272\u3001\u6D45\u8272\u3001\u8DDF\u968F\u7CFB\u7EDF\u4E09\u79CD\u6A21\u5F0F\u3002", tip: "\u591C\u95F4\u63A8\u8350\u6DF1\u8272\u6A21\u5F0F\uFF0C\u51CF\u8F7B\u89C6\u89C9\u75B2\u52B3\u3002" },
    { title: "\u5F00\u673A\u81EA\u542F\u52A8", body: "\u6258\u76D8\u53F3\u952E\u83DC\u5355\u4E2D\u9009\u62E9\u201C\u5F00\u673A\u81EA\u542F\u52A8\u201D\u3002\u5199\u5165 Windows \u6CE8\u518C\u8868\u542F\u52A8\u9879\uFF0C\u79FB\u9664\u540E\u4E0D\u5F71\u54CD\u6B63\u5E38\u4F7F\u7528\u3002", tip: "\u5EFA\u8BAE\u5F00\u542F\uFF0C\u786E\u4FDD\u4E0D\u9057\u6F0F\u4EFB\u4F55\u590D\u5236\u64CD\u4F5C\u3002" },
  ]);
  
  // Chapter 5
  writeChapter(doc, "5", "\u7A97\u53E3\u4E0E\u7CFB\u7EDF\u6258\u76D8", [
    { title: "\u7A97\u53E3\u64CD\u4F5C", body: "\u65E0\u8FB9\u6846\u8BBE\u8BA1\uFF0C\u5DE6\u4E0A\u89D2\u7EA2\u3001\u9EC4\u3001\u84DD\u4E09\u4E2A\u63A7\u5236\u6309\u94AE\uFF08\u5173\u95ED\u3001\u6700\u5C0F\u5316\u3001\u7F6E\u9876\u5207\u6362\uFF09\u3002\u53EF\u62D6\u62FD\u8FB9\u7F18\u8C03\u6574\u5927\u5C0F\uFF0C\u81EA\u52A8\u4FDD\u5B58\u7A97\u53E3\u4F4D\u7F6E\u548C\u5927\u5C0F\u3002", tip: "\u7F6E\u9876\u6A21\u5F0F\u9002\u5408\u9891\u7E41\u53C2\u8003\u526A\u8D34\u677F\u5185\u5BB9\u65F6\u4F7F\u7528\u3002" },
    { title: "\u7CFB\u7EDF\u6258\u76D8", body: "\u542F\u52A8\u540E\u81EA\u52A8\u6700\u5C0F\u5316\u5230\u6258\u76D8\u3002\u53F3\u952E\u83DC\u5355\u5305\u542B\uFF1A\u663E\u793A\u7A97\u53E3\u3001\u5F00\u673A\u81EA\u542F\u52A8\u3001\u5916\u89C2\u3001\u8BED\u8A00\u3001\u9000\u51FA\u3002\u5DE6\u952E\u5FEB\u901F\u547C\u51FA\u4E3B\u7A97\u53E3\u3002", tip: "\u540E\u53F0\u8FD0\u884C\u8D44\u6E90\u5360\u7528\u6781\u4F4E\uFF0C\u53EF\u5E38\u9A7B\u8FD0\u884C\u3002" },
    { title: "\u5168\u5C40\u5FEB\u6377\u952E", body: "\u9ED8\u8BA4 Ctrl+Shift+V \u663E\u793A/\u9690\u85CF\u4E3B\u7A97\u53E3\u3002\u5728\u6240\u6709\u5E94\u7528\u4E2D\u5747\u53EF\u4F7F\u7528\u3002\u53EF\u63D0\u9AD8\u5DE5\u4F5C\u6548\u7387\uFF0C\u51CF\u5C11\u9F20\u6807\u64CD\u4F5C\u3002", tip: "\u5982\u51B2\u7A81\u53EF\u5728\u8BBE\u7F6E\u4E2D\u81EA\u5B9A\u4E49\u4FEE\u6539\u3002" },
  ]);
  
  // Chapter 6
  writeChapter(doc, "6", "\u6570\u636E\u7BA1\u7406", [
    { title: "\u6570\u636E\u5B58\u50A8", body: "\u4F7F\u7528 SQLite \u672C\u5730\u6570\u636E\u5E93\u5B58\u50A8\uFF0C\u4E0D\u4E0A\u4F20\u4E91\u7AEF\u3002\u652F\u6301\u6587\u672C\u548C\u56FE\u7247\u5B58\u50A8\uFF0C\u6BCF\u6761\u8BB0\u5F55\u5305\u542B\u5185\u5BB9\u3001\u7C7B\u578B\u3001\u65F6\u95F4\u6233\u3001\u7F6E\u9876\u72B6\u6001\u3002", tip: "\u672C\u5730\u5B58\u50A8\uFF0C\u6570\u636E\u4E0D\u4F1A\u79BB\u5F00\u60A8\u7684\u7535\u8111\u3002" },
    { title: "\u81EA\u52A8\u6E05\u7406\u673A\u5236", body: "\u6BCF\u6B21\u542F\u52A8\u65F6\u81EA\u52A8\u6E05\u7406 7 \u5929\u524D\u7684\u975E\u7F6E\u9876\u8BB0\u5F55\u3002\u540E\u53F0\u9759\u9ED8\u6267\u884C\uFF0C\u4E0D\u5F71\u54CD\u4F7F\u7528\u3002", tip: "\u4E0D\u60F3\u88AB\u6E05\u7406\u7684\u8BB0\u5F55\u70B9\u51FB\u56FE\u9489\u7F6E\u9876\u5373\u53EF\u3002" },
    { title: "\u6279\u91CF\u64CD\u4F5C", body: "\u8FDB\u5165\u591A\u9009\u6A21\u5F0F\u540E\u53EF\u52FE\u9009\u591A\u6761\u8BB0\u5F55\uFF0C\u652F\u6301\u6279\u91CF\u7F6E\u9876\u548C\u6279\u91CF\u5220\u9664\u3002\u64CD\u4F5C\u5B8C\u6210\u540E\u81EA\u52A8\u9000\u51FA\u591A\u9009\u6A21\u5F0F\u3002", tip: "\u6279\u91CF\u5220\u9664\u4E0D\u53EF\u64A4\u9500\uFF0C\u8BF7\u786E\u8BA4\u540E\u518D\u64CD\u4F5C\u3002" },
  ]);
  
  // FAQ
  doc.addPage();
  doc.rect(0,0,595.28,841.89).fill("#ffffff");
  doc.fontSize(24).fillColor("#1a365d").text("\u5E38\u89C1\u95EE\u9898\uFF08FAQ\uFF09", 54, 50);
  doc.rect(54,80,50,3).fill("#2b6cb0");
  var faq = [
    ["PinClip \u662F\u5426\u652F\u6301\u56FE\u7247\u590D\u5236\uFF1F", "\u652F\u6301\u3002PinClip \u53EF\u4EE5\u8BB0\u5F55 PNG \u548C JPEG \u683C\u5F0F\u7684\u56FE\u7247\uFF0C\u5728\u5217\u8868\u4E2D\u4F1A\u663E\u793A\u7F29\u7565\u56FE\u9884\u89C8\u3002"],
    ["\u5982\u4F55\u786E\u4FDD\u5F00\u673A\u81EA\u542F\u52A8\uFF1F", "\u6258\u76D8\u53F3\u952E\u83DC\u5355\u4E2D\u9009\u62E9\u201C\u5F00\u673A\u81EA\u542F\u52A8\u201D\u5373\u53EF\u3002"],
    ["\u5386\u53F2\u8BB0\u5F55\u5360\u7528\u591A\u5C11\u7A7A\u95F4\uFF1F", "\u6570\u6708\u7684\u6570\u636E\u4EC5\u5360\u7528\u51E0\u5341 MB\u3002\u7CFB\u7EDF\u81EA\u52A8\u6E05\u7406 7 \u5929\u524D\u7684\u975E\u7F6E\u9876\u8BB0\u5F55\u3002"],
    ["\u5982\u4F55\u4FEE\u6539\u5FEB\u6377\u952E\uFF1F", "\u9ED8\u8BA4 Ctrl+Shift+V\uFF0C\u53EF\u5728\u8BBE\u7F6E\u4E2D\u81EA\u5B9A\u4E49\u4FEE\u6539\u3002"],
    ["\u4F1A\u8054\u7F51\u4E0A\u4F20\u6570\u636E\u5417\uFF1F", "\u4E0D\u4F1A\u3002\u6240\u6709\u6570\u636E\u5B58\u50A8\u5728\u672C\u5730 SQLite \u6570\u636E\u5E93\u4E2D\uFF0C\u5B8C\u5168\u79BB\u7EBF\u5DE5\u4F5C\u3002"],
    ["\u4E3A\u4EC0\u4E48\u6709\u4E9B\u8BB0\u5F55\u672A\u663E\u793A\uFF1F", "\u53EF\u80FD\u8D85\u8FC7\u4E86 7 \u5929\u6E05\u7406\u671F\u9650\u6216\u590D\u5236\u7684\u5185\u5BB9\u7C7B\u578B\u4E0D\u652F\u6301\u3002"],
    ["\u5982\u4F55\u5BFC\u51FA\u5907\u4EFD\u6570\u636E\uFF1F", "\u76F4\u63A5\u5907\u4EFD PinClip \u7528\u6237\u6570\u636E\u76EE\u5F55\u4E0B\u7684\u6570\u636E\u5E93\u6587\u4EF6\u3002"],
    ["\u652F\u6301\u54EA\u4E9B Windows \u7248\u672C\uFF1F", "\u652F\u6301 Windows 10 \u53CA\u4EE5\u4E0A\u7248\u672C\u3002"],
    ["\u591A\u9009\u6A21\u5F0F\u53EF\u4EE5\u5168\u9009\u5417\uFF1F", "\u76EE\u524D\u652F\u6301\u9010\u6761\u52FE\u9009\uFF0C\u53EF\u914D\u5408\u6279\u91CF\u64CD\u4F5C\u4F7F\u7528\u3002"],
    ["\u5173\u95ED\u7A97\u53E3\u540E\u4E3A\u4EC0\u4E48\u8FD8\u5728\u8FD0\u884C\uFF1F", "PinClip \u8BBE\u8BA1\u4E3A\u540E\u53F0\u5E38\u9A7B\uFF0C\u70B9\u51FB\u5173\u95ED\u53EA\u662F\u9690\u85CF\u5230\u6258\u76D8\u3002\u5B8C\u5168\u9000\u51FA\u9700\u8981\u5728\u6258\u76D8\u83DC\u5355\u4E2D\u70B9\u51FB\u201C\u9000\u51FA\u201D\u3002"],
  ];
  y = 110;
  for (var j = 0; j < faq.length; j++) {
    if (y > 760) { y = 50; doc.addPage(); doc.rect(0,0,595.28,841.89).fill("#ffffff"); }
    doc.roundedRect(54, y, 487.28, 36, 4).fillOpacity(0.06).fill("#2b6cb0").fillOpacity(1);
    doc.fontSize(11).fillColor("#1a365d").text(faq[j][0], 64, y + 6, { width: 467.28 });
    y += 40;
    doc.fontSize(10).fillColor("#2d3748").text(faq[j][1], 54, y, { width: 487.28, lineGap: 4 });
    y = doc.y + 12;
  }
  addPageFooter(doc);
  
  // Appendix
  doc.addPage();
  doc.rect(0,0,595.28,841.89).fill("#ffffff");
  doc.fontSize(24).fillColor("#1a365d").text("\u9644\u5F55\uFF1A\u6280\u672F\u89C4\u683C", 54, 50);
  doc.rect(54,80,50,3).fill("#2b6cb0");
  var specs = [
    ["\u5E94\u7528\u540D\u79F0", "PinClip"], ["\u7248\u672C\u53F7", "1.2.1"], ["\u5F00\u53D1\u6846\u67B6", "Electron"],
    ["\u9002\u7528\u5E73\u53F0", "Windows 10 / Windows 11"], ["\u67B6\u6784\u652F\u6301", "x64"],
    ["\u526A\u8D34\u677F\u76D1\u542C", "Windows AddClipboardFormatListener API"],
    ["\u6570\u636E\u5B58\u50A8", "SQLite\uFF08\u5D4C\u5165\u5F0F\u672C\u5730\u6570\u636E\u5E93\uFF09"],
    ["\u5168\u5C40\u5FEB\u6377\u952E", "Ctrl + Shift + V"],
    ["\u652F\u6301\u8BED\u8A00", "\u7B80\u4F53\u4E2D\u6587 / \u7E41\u4F53\u4E2D\u6587 / \u65E5\u6587 / \u82F1\u6587"],
    ["\u754C\u9762\u6A21\u5F0F", "\u6DF1\u8272 / \u6D45\u8272 / \u8DDF\u968F\u7CFB\u7EDF"],
    ["\u5B89\u88C5\u65B9\u5F0F", "\u4FBF\u643A\u7248 / NSIS \u5B89\u88C5\u7248 / \u5FAE\u8F6F\u5546\u5E97 APPX"],
    ["\u53D1\u5E03\u6E20\u9053", "GitHub / \u5FAE\u8F6F\u5546\u5E97"],
  ];
  y = 115;
  for (var k = 0; k < specs.length; k++) {
    if (y > 780) { y = 50; doc.addPage(); doc.rect(0,0,595.28,841.89).fill("#ffffff"); }
    doc.roundedRect(54, y, 487.28, 32, 3).fillOpacity(k % 2 === 0 ? 0 : 0.03).fill("#2d3748").fillOpacity(1);
    doc.fontSize(10).fillColor("#1a365d").text(specs[k][0], 66, y + 8);
    doc.fontSize(10).fillColor("#2d3748").text(specs[k][1], 200, y + 8, { width: 331.28 });
    y += 38;
  }
  addPageFooter(doc);
  
  // Back cover
  doc.addPage();
  doc.rect(0,0,595.28,841.89).fill("#0f1a2e");
  doc.circle(297.64, 420, 160).fillOpacity(0.06).fill("#4299e1").fillOpacity(1);
  doc.fontSize(20).fillColor("#ffffff").text("PinClip", 54, 380, { align: "center", width: 487.28 });
  doc.fontSize(12).fillColor("#718096").text("\u8F7B\u91CF\u7EA7 \u00B7 \u9AD8\u6548 \u00B7 \u9690\u79C1\u5B89\u5168", 54, 420, { align: "center", width: 487.28 });
  doc.fontSize(10).fillColor("#4a5568").text("\u611F\u8C22\u60A8\u4F7F\u7528 PinClip", 54, 500, { align: "center", width: 487.28 });
  
  doc.end();
  ws.on("finish", function() { console.log("PDF OK: " + (fs.statSync(OUTPUT_PATH).size / 1024).toFixed(1) + " KB"); });
}

main();

