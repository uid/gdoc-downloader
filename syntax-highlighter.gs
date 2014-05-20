// Syntax highlighter for LaTeX syntax in Google Docs.
// See README.md for installation and usage instructions.

/**
 * The onOpen function runs automatically when the Google Docs document is
 * opened. Use it to add custom menus to Google Docs that allow the user to run
 * custom scripts. For more information, please consult the following two
 * resources.
 *
 * Extending Google Docs developer guide:
 *     https://developers.google.com/apps-script/guides/docs
 *
 * Document service reference documentation:
 *     https://developers.google.com/apps-script/reference/document/
 */
function onOpen() {
  // Add a menu with some items, some separators, and a sub-menu.
  DocumentApp.getUi().createMenu('Syntax highlighting')
      .addItem('Highlight LaTeX syntax', 'highlightSyntax')
      .addToUi();
}


function highlightSyntax() {
  var body = DocumentApp.getActiveDocument().getBody();
  
  // reset formatting
  var bodyAsText = body.editAsText();
//  bodyAsText.setBold(false);
//  bodyAsText.setItalic(false);
//  bodyAsText.setForegroundColor("#000000");
//  bodyAsText.setBackgroundColor("#FFFFFF");
  // TODO still need to figure out how to reset all paragraphs to normal text
  
  // highlight tags
  var tagRegExp = "\\\\[a-zA-Z]+";
  var tagColor = "#AA0000";
  syntaxHighlightHelper(tagRegExp, function(text, startOffset, endOffset) {text.setForegroundColor(startOffset, endOffset, tagColor);});
  
  // bold
  syntaxHighlightHelper("\\\\bf[^}]+}", function(text, startOffset, endOffset) {text.setBold(startOffset +3, endOffset - 1, true);});
  syntaxHighlightHelper("\\\\textbf{[^}]+}", function(text, startOffset, endOffset) {text.setBold(startOffset +8, endOffset - 1, true);});
  
  // italics
  syntaxHighlightHelper("\\\\it[\\s\\\\][^}]+}", function(text, startOffset, endOffset) {text.setItalic(startOffset +3, endOffset - 1, true);});
  syntaxHighlightHelper("\\\\textit{[^}]+}", function(text, startOffset, endOffset) {text.setItalic(startOffset +8, endOffset - 1, true);});
    
  // emph
  syntaxHighlightHelper("\\\\emph{[^}]+}", function(text, startOffset, endOffset) {text.setItalic(startOffset +6, endOffset - 1, true);});

  // set format for sections and subsections
  syntaxHighlightHelper("\\\\title{[^}]+}", function(text, startOffset, endOffset) {text.getParent().asParagraph().setHeading(DocumentApp.ParagraphHeading.TITLE);});
  syntaxHighlightHelper("\\\\chapter{[^}]+}", function(text, startOffset, endOffset) {text.getParent().asParagraph().setHeading(DocumentApp.ParagraphHeading.HEADING1);});
  syntaxHighlightHelper("\\\\section{[^}]+}", function(text, startOffset, endOffset) {text.getParent().asParagraph().setHeading(DocumentApp.ParagraphHeading.HEADING2);});
  syntaxHighlightHelper("\\\\subsection{[^}]+}", function(text, startOffset, endOffset) {text.getParent().asParagraph().setHeading(DocumentApp.ParagraphHeading.HEADING3);});
  syntaxHighlightHelper("\\\\subsubsection{[^}]+}", function(text, startOffset, endOffset) {text.getParent().asParagraph().setHeading(DocumentApp.ParagraphHeading.HEADING3);});

  // highlight comments that start at the beginning of a line
  var commentRegExp = "^%.+$";
  var commentColor = "#888888";
  syntaxHighlightHelper(commentRegExp, function(text, startOffset, endOffset) {text.setForegroundColor(startOffset, endOffset, commentColor);});
  
  // highlight comments that start in the middle of a line
  var commentRegExp = "[^\\\\]%.+$";
  var commentColor = "#888888";
  syntaxHighlightHelper(commentRegExp, function(text, startOffset, endOffset) {text.setForegroundColor(startOffset+1, endOffset, commentColor);});
}

function syntaxHighlightHelper(regexp, formattingFunction) {
  var body = DocumentApp.getActiveDocument().getBody();
  
  var selection = body.findText("BEGIN_DOCUMENT");
  if (selection)
    selection = body.findText(regexp, selection);
  else 
    selection = body.findText(regexp);

  while (selection) {
    var text = selection.getElement().editAsText();
    formattingFunction(text, selection.getStartOffset(),selection.getEndOffsetInclusive());
    selection = body.findText(regexp, selection);
  }
}


