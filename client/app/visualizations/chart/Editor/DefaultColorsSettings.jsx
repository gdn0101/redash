import { map } from 'lodash';
import React, { useMemo, useCallback } from 'react';
import Table from 'antd/lib/table';
import ColorPicker from '@/components/ColorPicker';
import { EditorPropTypes } from '@/visualizations';
import ColorPalette from '@/visualizations/ColorPalette';
import getChartData from '../getChartData';

export default function DefaultColorsSettings({ options, data, onOptionsChange }) {
  const colors = useMemo(() => ({
    Automatic: null,
    ...ColorPalette,
  }), []);

  const series = useMemo(() => map(
    getChartData(data.rows, options),
    ({ name }) => ({ key: name, color: options.seriesOptions[name].color }),
  ), [options, data]);

  const updateSeriesOption = useCallback((key, prop, value) => {
    onOptionsChange({
      seriesOptions: {
        [key]: {
          [prop]: value,
        },
      },
    });
  }, [onOptionsChange]);

  const columns = [
    {
      title: 'Series',
      dataIndex: 'key',
    },
    {
      title: 'Color',
      dataIndex: 'color',
      width: '1%',
      render: (unused, item) => (
        <ColorPicker
          interactive
          presetColors={colors}
          placement="topRight"
          color={item.color}
          onChange={value => updateSeriesOption(item.key, 'color', value)}
        />
      ),
    },
  ];

  return (
    <Table
      showHeader={false}
      dataSource={series}
      columns={columns}
      pagination={false}
    />
  );
}

DefaultColorsSettings.propTypes = EditorPropTypes;
