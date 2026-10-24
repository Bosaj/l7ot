import asyncio
import os
import re
import shutil
import sys
import edge_tts

# Force utf-8 for stdout
sys.stdout.reconfigure(encoding='utf-8')

async def generate_voice(text: str, voice: str, output_path: str):
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    communicator = edge_tts.Communicate(text, voice)
    await communicator.save(output_path)

async def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    project_dir = os.path.dirname(base_dir)
    fish_ts_path = os.path.join(project_dir, 'src', 'data', 'fish.ts')
    audio_dir = os.path.join(project_dir, 'public', 'audio', 'fish')

    os.makedirs(os.path.join(audio_dir, 'ar'), exist_ok=True)
    os.makedirs(os.path.join(audio_dir, 'fr'), exist_ok=True)
    os.makedirs(os.path.join(audio_dir, 'en'), exist_ok=True)

    json_path = os.path.join(project_dir, 'fish_for_tts.json')
    if os.path.exists(json_path):
        import json
        with open(json_path, 'r', encoding='utf-8') as f:
            fish_list = json.load(f)
        print(f"Loaded {len(fish_list)} fish species from fish_for_tts.json")
    else:
        fish_list = []

    VOICE_AR = 'ar-MA-JamalNeural' # Native Moroccan Arabic Neural Voice
    VOICE_FR = 'fr-FR-VivienneMultilingualNeural' # Natural Parisian French Neural Voice
    VOICE_EN = 'en-US-ChristopherNeural' # Clear Resonant English Neural Voice

    print(f"Successfully identified {len(fish_list)} fish species for voice synthesis")

    for idx, fish in enumerate(fish_list, 1):
        fish_id = fish['id']
        name_ar = fish['nameAr']
        name_fr = fish['nameFr']
        name_en = fish['nameEn']

        path_ar = os.path.join(audio_dir, 'ar', f"{fish_id}.mp3")
        path_fr = os.path.join(audio_dir, 'fr', f"{fish_id}.mp3")
        path_en = os.path.join(audio_dir, 'en', f"{fish_id}.mp3")
        path_root = os.path.join(audio_dir, f"{fish_id}.mp3")

        # Skip if already generated and non-empty
        if (os.path.exists(path_ar) and os.path.getsize(path_ar) > 500 and
            os.path.exists(path_fr) and os.path.getsize(path_fr) > 500 and
            os.path.exists(path_en) and os.path.getsize(path_en) > 500 and
            os.path.exists(path_root) and os.path.getsize(path_root) > 500):
            print(f"[{idx}/{len(fish_list)}] Already synthesized: {fish_id}")
            continue

        print(f"[{idx}/{len(fish_list)}] Synthesizing: {fish_id} -> AR: {name_ar} | FR: {name_fr} | EN: {name_en}")

        try:
            await asyncio.gather(
                generate_voice(name_ar, VOICE_AR, path_ar),
                generate_voice(name_fr, VOICE_FR, path_fr),
                generate_voice(name_en, VOICE_EN, path_en),
            )
            shutil.copyfile(path_ar, path_root)
        except Exception as e:
            print(f"Error on {fish_id}: {e}, retrying individually...")
            await generate_voice(name_ar, VOICE_AR, path_ar)
            await generate_voice(name_fr, VOICE_FR, path_fr)
            await generate_voice(name_en, VOICE_EN, path_en)
            shutil.copyfile(path_ar, path_root)

    print(f"COMPLETED! Generated {len(fish_list) * 3} audio recordings across Arabic, French, and English!")

if __name__ == '__main__':
    asyncio.run(main())
