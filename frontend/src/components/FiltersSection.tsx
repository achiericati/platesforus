import React from 'react';

interface FiltersSectionProps {
  showFilters: boolean;
  onToggleFilters: () => void;
  resetFilters: () => void;
  categoryFilter: string;
  difficultyFilter: string;
  timeFilter: number | null;
  setCategoryFilter: (value: string) => void;
  setDifficultyFilter: (value: string) => void;
  setTimeFilter: (value: number | null) => void;
  applyFilters: (categoryValue: string, difficultyValue: string, timeValue: number | null) => void;
  categories: string[];
  difficulties: string[];
}

const FiltersSection: React.FC<FiltersSectionProps> = ({
  showFilters,
  onToggleFilters,
  resetFilters,
  categoryFilter,
  difficultyFilter,
  timeFilter,
  setCategoryFilter,
  setDifficultyFilter,
  setTimeFilter,
  applyFilters,
  categories,
  difficulties
}) => {
  return (
    <>
      <div className="flex items-center justify-center mb-4 gap-2">

        <div style={{ marginRight: '5px' }} className="bg-white rounded-full shadow px-3 py-2 flex items-center">
          <label className="flex items-center cursor-pointer">
            <div className="relative w-8 h-4">
              <input
                type="checkbox"
                className="sr-only"
                checked={showFilters}
                onChange={onToggleFilters}
              />
              <div className="w-8 h-4 bg-gray-300 rounded-full transition-colors duration-300"></div>
              <div
                className={`absolute top-0 left-0 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${showFilters ? 'translate-x-[16px] bg-purple-600' : ''}`}
              ></div>
            </div>
            <span className="ml-3 text-purple-600 text-xs font-semibold">
              {showFilters ? 'Nascondi Filtri' : 'Mostra Filtri'}
            </span>
          </label>
        </div>

        <button
          onClick={resetFilters}
          className="bg-white text-purple-600 font-semibold px-4 py-2 rounded-full shadow hover:bg-gray-200 transition-colors text-xs outline-none focus:outline-none"
        >
          Reset Filtri
        </button>
      </div>

      {showFilters && (
        <div className="grid grid-cols-3 xl:grid-cols-3 gap-6 w-full px-4 mb-8">

          {/* Categoria */}
          <div className="flex justify-center xl:justify-start">
            <div>
              <h4 className="text-sm font-semibold text-white-600">Categoria:</h4>
              <div className="flex gap-2 mt-2 flex-wrap justify-center xl:justify-start">
                {categories.map((category) => (
                  <button
                    key={category}
                    style={{ marginRight: '5px', marginTop: '5px' }}
                    onClick={() => {
                      setCategoryFilter(category);
                      applyFilters(category, difficultyFilter, timeFilter);
                    }}
                    className={`px-2 py-1 rounded-full text-xs ${
                      category === categoryFilter
                        ? 'bg-purple-600 text-white'
                        : 'bg-white text-purple-600'
                    } outline-none focus:outline-none`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Difficoltà */}
          <div className="flex justify-center">
            <div>
              <h4 className="text-sm font-semibold text-white-600">Difficoltà:</h4>
              <div className="flex gap-2 mt-2 flex-wrap justify-center">
                {difficulties.map((difficulty) => (
                  <button
                    key={difficulty}
                    style={{ marginRight: '5px', marginTop: '5px' }}
                    onClick={() => {
                      setDifficultyFilter(difficulty);
                      applyFilters(categoryFilter, difficulty, timeFilter);
                    }}
                    className={`px-2 py-1 rounded-full text-xs ${
                      difficulty === difficultyFilter
                        ? 'bg-purple-600 text-white'
                        : 'bg-white text-purple-600 border'
                    } outline-none focus:outline-none`}
                  >
                    {difficulty}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tempo */}
          <div className="flex justify-center xl:justify-end">
            <div>
              <h4 className="text-sm font-semibold text-white-600">Tempo di preparazione:</h4>
              <div className="flex gap-2 mt-2 flex-wrap justify-center xl:justify-end">
                {[15, 30, 45, 60, 90].map((time) => (
                  <button
                    key={time}
                    style={{ marginRight: '5px', marginTop: '5px' }}
                    onClick={() => {
                      setTimeFilter(time);
                      applyFilters(categoryFilter, difficultyFilter, time);
                    }}
                    className={`px-2 py-1 rounded-full text-xs ${
                      time === timeFilter
                        ? 'bg-purple-600 text-white'
                        : 'bg-white text-purple-600 border'
                    } outline-none focus:outline-none`}
                  >
                    {time}'
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}
    </>
  );
};

export default FiltersSection;