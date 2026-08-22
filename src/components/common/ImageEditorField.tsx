import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Link as LinkIcon, 
  Sparkles, 
  Sliders, 
  Trash2, 
  Image as ImageIcon, 
  Eye, 
  Check, 
  AlertCircle,
  Maximize2
} from 'lucide-react';
import { ROBOT_PRESET_IMAGES, PresetImage } from '../../data/robotPresetImages';

interface ImageFilterConfig {
  brightness?: number;
  contrast?: number;
  glow?: boolean;
  grayscale?: boolean;
}

interface ImageEditorFieldProps {
  value?: string;
  onChange: (url: string) => void;
  filter?: ImageFilterConfig;
  onFilterChange?: (filter: ImageFilterConfig) => void;
  presetCategory?: 'hero' | 'project' | 'competition' | 'award';
  label?: string;
  helperText?: string;
}

export const ImageEditorField: React.FC<ImageEditorFieldProps> = ({
  value = '',
  onChange,
  filter = { brightness: 100, contrast: 100, glow: false, grayscale: false },
  onFilterChange,
  presetCategory = 'project',
  label = '사진/이미지 등록 및 편집',
  helperText = '내 컴퓨터 파일 업로드, 외부 이미지 URL 입력 또는 로봇 프리셋 갤러리에서 선택할 수 있습니다.'
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'url' | 'presets' | 'filters'>('upload');
  const [urlInput, setUrlInput] = useState(value && !value.startsWith('data:') ? value : '');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [compressionInfo, setCompressionInfo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Compress image on client using HTML5 Canvas to keep Base64 lightweight for Firestore / localStorage
  const processAndCompressFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMsg('이미지 파일(PNG, JPG, WebP, GIF)만 업로드 가능합니다.');
      return;
    }

    setIsProcessing(true);
    setErrorMsg('');
    setCompressionInfo(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Target max dimension 1000px
        const maxDim = 1000;
        let width = img.width;
        let height = img.height;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;

        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          // Compress to JPEG / WebP data URL
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
          const sizeKb = Math.round((compressedDataUrl.length * 3) / 4 / 1024);
          
          onChange(compressedDataUrl);
          setCompressionInfo(`압축 최적화 완료: ${width}x${height}px (${sizeKb} KB)`);
        }
        setIsProcessing(false);
      };
      img.onerror = () => {
        setErrorMsg('이미지 파일을 읽는 중 오류가 발생했습니다.');
        setIsProcessing(false);
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
      setErrorMsg('파일을 로드하지 못했습니다.');
      setIsProcessing(false);
    };
    reader.readAsDataURL(file);
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processAndCompressFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processAndCompressFile(e.target.files[0]);
    }
  };

  const handleUrlSubmit = () => {
    if (!urlInput.trim()) {
      setErrorMsg('유효한 이미지 URL 주소를 입력해주세요.');
      return;
    }
    setErrorMsg('');
    onChange(urlInput.trim());
    setCompressionInfo('웹 이미지 URL 연결 완료');
  };

  const handlePresetSelect = (preset: PresetImage) => {
    onChange(preset.url);
    setUrlInput(preset.url);
    setCompressionInfo(`프리셋 적용: ${preset.title}`);
    setErrorMsg('');
  };

  const handleClearImage = () => {
    onChange('');
    setUrlInput('');
    setCompressionInfo(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const currentBrightness = filter.brightness ?? 100;
  const currentContrast = filter.contrast ?? 100;
  const currentGlow = filter.glow ?? false;
  const currentGrayscale = filter.grayscale ?? false;

  const getPreviewFilterStyle = () => {
    let filterString = `brightness(${currentBrightness}%) contrast(${currentContrast}%)`;
    if (currentGrayscale) {
      filterString += ' grayscale(80%) hue-rotate(180deg)';
    }
    return {
      filter: filterString,
      boxShadow: currentGlow ? '0 0 25px rgba(34, 211, 238, 0.6)' : undefined,
    };
  };

  const filteredPresets = ROBOT_PRESET_IMAGES.filter(
    p => p.category === presetCategory || presetCategory === 'hero' || p.category === 'project'
  );

  return (
    <div className="space-y-3 font-mono">
      {/* Label and Helper */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
          <ImageIcon size={14} className="text-cyan-400" />
          <span>{label}</span>
        </label>
        {value && (
          <button
            type="button"
            onClick={handleClearImage}
            className="text-[11px] text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <Trash2 size={12} />
            <span>사진 삭제</span>
          </button>
        )}
      </div>

      <p className="text-[11px] text-slate-400 font-sans">{helperText}</p>

      {/* Tabs */}
      <div className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-[#050c17] border border-slate-800 text-[11px]">
        <button
          type="button"
          onClick={() => setActiveTab('upload')}
          className={`py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'upload'
              ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/50 font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Upload size={13} />
          <span>파일 업로드</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('url')}
          className={`py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'url'
              ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/50 font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <LinkIcon size={13} />
          <span>URL 입력</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('presets')}
          className={`py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'presets'
              ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/50 font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sparkles size={13} />
          <span>로봇 갤러리</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('filters')}
          className={`py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'filters'
              ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/50 font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sliders size={13} />
          <span>필터/조정</span>
        </button>
      </div>

      {/* Tab 1: File Upload */}
      {activeTab === 'upload' && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleFileDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all duration-200 ${
            isDragOver
              ? 'border-cyan-400 bg-cyan-950/40 shadow-[0_0_20px_rgba(34,211,238,0.3)]'
              : 'border-slate-700 hover:border-cyan-500/60 bg-[#050c17]/60 hover:bg-[#071324]'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="flex flex-col items-center justify-center gap-2">
            <div className="p-3 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
              <Upload size={20} className={isProcessing ? 'animate-bounce' : ''} />
            </div>

            {isProcessing ? (
              <div className="space-y-1">
                <p className="text-xs text-cyan-300 font-bold">이미지 최적화 처리 중...</p>
                <p className="text-[10px] text-slate-400">클라우드 동기화용 압축 진행</p>
              </div>
            ) : (
              <div className="space-y-1">
                <p className="text-xs text-slate-200 font-medium">
                  사진 파일을 이곳에 드래그하거나 <span className="text-cyan-400 underline">클릭하여 선택</span>
                </p>
                <p className="text-[10px] text-slate-500">
                  PNG, JPG, WebP, GIF 지원 (자동 최적화 압축)
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: URL Input */}
      {activeTab === 'url' && (
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://example.com/robot-image.jpg"
              className="flex-1 px-3 py-2 bg-[#050c17] border border-slate-700 rounded-lg text-xs text-slate-100 placeholder-slate-600 focus:border-cyan-400 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleUrlSubmit}
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Check size={14} />
              <span>적용</span>
            </button>
          </div>
          <p className="text-[10px] text-slate-500">
            Unsplash, Discord, GitHub, Google 등 공개 이미지 주소를 붙여넣으세요.
          </p>
        </div>
      )}

      {/* Tab 3: Presets Gallery */}
      {activeTab === 'presets' && (
        <div className="space-y-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
            {filteredPresets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handlePresetSelect(preset)}
                className={`relative rounded-lg overflow-hidden border p-1 text-left group transition-all cursor-pointer ${
                  value === preset.url
                    ? 'border-cyan-400 bg-cyan-950/60 ring-2 ring-cyan-400/50'
                    : 'border-slate-800 hover:border-cyan-500/60 bg-[#050c17]'
                }`}
              >
                <div className="h-16 w-full rounded overflow-hidden bg-slate-900 mb-1.5 relative">
                  <img
                    src={preset.url}
                    alt={preset.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  {value === preset.url && (
                    <div className="absolute top-1 right-1 p-0.5 rounded bg-cyan-400 text-black">
                      <Check size={10} />
                    </div>
                  )}
                </div>
                <p className="text-[10px] font-bold text-slate-200 line-clamp-1 group-hover:text-cyan-300">
                  {preset.title}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Visual Filters */}
      {activeTab === 'filters' && (
        <div className="p-3 rounded-xl bg-[#050c17] border border-slate-800 space-y-3 text-xs">
          {/* Brightness */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] text-slate-300">
              <span>밝기 (Brightness)</span>
              <span className="text-cyan-400">{currentBrightness}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="150"
              step="5"
              value={currentBrightness}
              onChange={(e) =>
                onFilterChange?.({
                  ...filter,
                  brightness: Number(e.target.value)
                })
              }
              className="w-full accent-cyan-400 bg-slate-800"
            />
          </div>

          {/* Contrast */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] text-slate-300">
              <span>대비 (Contrast)</span>
              <span className="text-cyan-400">{currentContrast}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="150"
              step="5"
              value={currentContrast}
              onChange={(e) =>
                onFilterChange?.({
                  ...filter,
                  contrast: Number(e.target.value)
                })
              }
              className="w-full accent-cyan-400 bg-slate-800"
            />
          </div>

          {/* Toggle Switches */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={() =>
                onFilterChange?.({
                  ...filter,
                  glow: !currentGlow
                })
              }
              className={`p-2 rounded-lg border text-[11px] flex items-center justify-between cursor-pointer transition-colors ${
                currentGlow
                  ? 'border-cyan-400 bg-cyan-950/80 text-cyan-300 font-bold'
                  : 'border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <span>네온 글로우 (Neon)</span>
              <Sparkles size={12} className={currentGlow ? 'text-cyan-400' : 'text-slate-600'} />
            </button>

            <button
              type="button"
              onClick={() =>
                onFilterChange?.({
                  ...filter,
                  grayscale: !currentGrayscale
                })
              }
              className={`p-2 rounded-lg border text-[11px] flex items-center justify-between cursor-pointer transition-colors ${
                currentGrayscale
                  ? 'border-cyan-400 bg-cyan-950/80 text-cyan-300 font-bold'
                  : 'border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <span>사이버 매트릭스 틴트</span>
              <Sliders size={12} className={currentGrayscale ? 'text-cyan-400' : 'text-slate-600'} />
            </button>
          </div>
        </div>
      )}

      {/* Notifications / Messages */}
      {errorMsg && (
        <div className="flex items-center gap-1.5 p-2 rounded-lg bg-red-950/50 border border-red-500/50 text-red-300 text-[11px]">
          <AlertCircle size={13} className="flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {compressionInfo && (
        <p className="text-[10px] text-emerald-400 flex items-center gap-1">
          <Check size={11} />
          <span>{compressionInfo}</span>
        </p>
      )}

      {/* Live Preview Box */}
      {value ? (
        <div className="relative rounded-xl border border-cyan-500/40 bg-[#040912] p-2.5 space-y-1.5 overflow-hidden">
          <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-800/80 pb-1">
            <span className="flex items-center gap-1 text-cyan-400">
              <Eye size={12} />
              <span>실시간 적용 미리보기</span>
            </span>
            <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              ACTIVE IMAGE
            </span>
          </div>

          <div className="relative h-40 sm:h-48 w-full rounded-lg overflow-hidden bg-black flex items-center justify-center">
            {/* Cyber Grid Background */}
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(34, 211, 238, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(34, 211, 238, 0.2) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}
            />

            {/* Rendered Image with filters */}
            <img
              src={value}
              alt="Photo preview"
              referrerPolicy="no-referrer"
              style={getPreviewFilterStyle()}
              className="w-full h-full object-contain relative z-10 transition-all duration-300"
            />

            {/* Corner HUD Accents */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-400 z-20 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-400 z-20 pointer-events-none" />
          </div>
        </div>
      ) : (
        <div className="p-3 rounded-lg bg-[#050c17] border border-dashed border-slate-800 text-center text-slate-500 text-[11px]">
          등록된 사진이 없습니다. 상단 탭에서 사진을 업로드하거나 선택하세요.
        </div>
      )}
    </div>
  );
};
