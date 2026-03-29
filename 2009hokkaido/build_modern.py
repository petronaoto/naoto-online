import os
import glob
from bs4 import BeautifulSoup

# 設定
OLD_DIR = '2009hokkaido'
NEW_DIR = '2009hokkaido_modern'
TEMPLATE_FILE = 'template.html'

def main():
    print("北海道ツーリングのモダン化を開始します...")
    
    # テンプレートの読み込み
    with open(TEMPLATE_FILE, 'r', encoding='utf-8') as f:
        template = f.read()

    # 古いHTMLファイルを一つずつ処理
    for filepath in glob.glob(os.path.join(OLD_DIR, '*.htm*')):
        filename = os.path.basename(filepath)
        
        # Word特有のゴミタグを無視しつつHTMLを解析
        with open(filepath, 'r', encoding='utf-8') as f:
            soup = BeautifulSoup(f, 'html.parser')

        # タイトルの取得（なければファイル名）
        page_title = soup.title.string.strip() if soup.title and soup.title.string else filename
        
        content_html = ""
        
        # すべての段落（<p>タグ）を順番にチェック
        for p in soup.find_all('p'):
            # ① 画像の抽出
            for img in p.find_all('img'):
                src = img.get('src')
                # カウンターやメニュー用の小さなロゴ画像は除外する
                if src and 'logo' not in src.lower() and 'accnt' not in src.lower():
                    content_html += f'\n        <div class="image-container"><img src="{src}" alt=""></div>\n'
            
            # ② テキストの抽出
            text = p.get_text(strip=True)
            # メニューの文字（TOP, Profile等）や空行を除外して純粋な文章だけを拾う
            ignore_words = ['TOP', 'Profile', 'About this website', 'Inquiry', 'Created by']
            if text and len(text) > 1 and not any(word in text for word in ignore_words):
                content_html += f'        <div class="text-block">{text}</div>\n'

        # テンプレートに流し込む
        new_html = template.replace('{{page_title}}', page_title)
        new_html = new_html.replace('{{hero_title}}', page_title)
        new_html = new_html.replace('{{content_area}}', content_html)
        
        # 前後リンクは一旦仮置き（後で手動で整えます）
        new_html = new_html.replace('{{prev_link}}', '')
        new_html = new_html.replace('{{next_link}}', '')

        # 新しいフォルダに保存
        save_path = os.path.join(NEW_DIR, filename)
        with open(save_path, 'w', encoding='utf-8') as f:
            f.write(new_html)
            
        print(f"モダン化完了: {filename}")

    print("すべての処理が完了しました！")

if __name__ == "__main__":
    main()