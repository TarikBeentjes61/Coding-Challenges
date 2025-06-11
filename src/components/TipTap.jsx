import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import { Undo, Redo, Bold, Italic, Code, Heading1, Heading2, Heading3, List, ListOrdered, ImageIcon, Strikethrough, Minus } from 'lucide-react';

const iconSize = 18;
const unselected = 'bg-gray-100 dark:bg-gray-600 mr-1 px-2 py-1 rounded';
const selected = 'bg-blue-500 dark:bg-blue-500 mr-1 px-2 py-1 rounded'

const TipTap = forwardRef(({ content }, ref) => {
  const blobMapRef = useRef(new Map());

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.extend({
        addCommands() {
          return {
            ...this.parent?.(),
            insertImageFromFile: (file) => ({ commands }) => {
              const blobUrl = URL.createObjectURL(file);
              blobMapRef.current.set(blobUrl, file);
              return commands.setImage({ src: blobUrl });
            },
          };
        },
      })

    ],
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert max-w-none mt-5 m-2 focus:outline-none',
      },
    },
    content,
  });

  useImperativeHandle(ref, () => ({
    getJSON: () => editor?.getJSON(),
    getBlobMap: () => blobMapRef.current,
  }));

  const insertImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = () => {
      const file = input.files?.[0];
      if (file) {
        editor?.commands.insertImageFromFile( file );
      }
    };
    input.click();
  };

  useEffect(() => {
    if (!editor) return;

    const handleUpdate = () => {
        const html = editor.getHTML();
        const currentBlobs = new Set();

        html.replace(/src="(blob:[^"]+)"/g, (_, blobUrl) => {
            currentBlobs.add(blobUrl);
            return '';
        });

        for (const [blobUrl, file] of blobMapRef.current.entries()) {
            if (!currentBlobs.has(blobUrl)) {
                URL.revokeObjectURL(blobUrl);
                blobMapRef.current.delete(blobUrl);
            }
        }
    };

    editor.on('update', handleUpdate);
    return () => editor.off('update', handleUpdate);
  }, [editor]);

  return (
    <div className="border rounded-xl p-4 shadow-md ">
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-4">
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className={unselected}
        >
        <Undo size={iconSize} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className={unselected}
        >
        <Redo size={iconSize} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? selected : unselected}
        >
        <Bold size={iconSize} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? selected : unselected}
        >
        <Italic size={iconSize} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? selected : unselected}
        >
        <Strikethrough size={iconSize} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? selected : unselected}
        >
        <Code size={iconSize} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level:1 }).run()}
          className={editor.isActive('heading', { level:1 }) ? selected : unselected}
        >
        <Heading1 size={iconSize} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level:2 }).run()}
          className={editor.isActive('heading', { level:2 }) ? selected : unselected}
        >
        <Heading2 size={iconSize} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level:3 }).run()}
          className={editor.isActive('heading', { level:3 }) ? selected : unselected}
        >
        <Heading3 size={iconSize} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? selected : unselected}
        >
        <List size={iconSize} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? selected : unselected}
        >
        <ListOrdered size={iconSize} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className={unselected}
        >
        <Minus size={iconSize} />
        </button>
        <button
          type="button"
          onClick={insertImage}
          className={unselected}
        >
        <ImageIcon size={iconSize} />
        </button>
      </div>
      <EditorContent editor={editor} className=""/>
    </div>
  )
});

export default TipTap
