import AppKit
let size = NSSize(width:1200,height:630)
let image = NSImage(size:size)
image.lockFocus()
NSColor.white.setFill();NSRect(origin:.zero,size:size).fill()
let green=NSColor(srgbRed:36/255,green:105/255,blue:79/255,alpha:1)
let ink=NSColor(srgbRed:32/255,green:37/255,blue:35/255,alpha:1)
func text(_ value:String,_ x:CGFloat,_ y:CGFloat,_ font:NSFont,_ color:NSColor){(value as NSString).draw(at:NSPoint(x:x,y:y),withAttributes:[.font:font,.foregroundColor:color])}
text("</>  SEOGEO.dev",70,530,.systemFont(ofSize:32,weight:.bold),green)
text("让你的作品，",70,363,.systemFont(ofSize:64,weight:.bold),ink)
text("被搜索，也被理解。",70,271,.systemFont(ofSize:64,weight:.bold),green)
text("面向开发者的 SEO、ASO 与 GEO 零基础指南",73,173,.systemFont(ofSize:26,weight:.regular),.darkGray)
green.setFill();NSRect(x:72,y:103,width:52,height:4).fill()
text("交互学习   /   概念速查   /   上线清单",145,89,.systemFont(ofSize:21,weight:.medium),green)
image.unlockFocus()
let data=image.tiffRepresentation!
let bitmap=NSBitmapImageRep(data:data)!
try bitmap.representation(using:.png,properties:[:])!.write(to:URL(fileURLWithPath:CommandLine.arguments[1]))
