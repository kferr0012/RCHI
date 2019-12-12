import React from 'react'
import { Row, Col } from 'antd';
import './DottedBox.css';

const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;

const DottedBox = () => (
    <div className="DottedBox">
      <p className="DottedBox_content">Graph/Table</p>
    </div>
  );



const PageLayoutPit = ({currentDistrict}) => {
    return (
        <div>
            <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]} type="flex" justify="space-around" align="middle" >
                <Col className="gutter-row" span={7}>
                    <h5>Age Table</h5> 
                    <DottedBox >col-1</DottedBox>
                </Col>
                <Col className="gutter-row" span={10}>
                    <Row>
                        <Col className="gutter-row" span={6}>
                            num-1
                            <DottedBox>num-1</DottedBox>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            num-2
                            <DottedBox>num-2</DottedBox>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            num-3
                            <DottedBox>num-3</DottedBox>
                        </Col>
                    </Row>
                </Col>
                <Col className="gutter-row" span={7}>
                    <h5>Gender</h5> 
                    <DottedBox> col-3</DottedBox>
                </Col>
            </Row>
            <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]} type="flex" justify="center" align="top" >
                <Col className="gutter-row"  span={7}>
                        <h5>Subpopulation</h5> 
                        <DottedBox >col-1</DottedBox>
                </Col>
                <Col className="gutter-row" span={17}>
                        <Row>
                            <Col className="gutter-row" span={16}>
                                <row>
                                    <Col className="gutter-row" span={12}>
                                        graph
                                    </Col>
                                    <Col className="gutter-row" span={12}>
                                        pie graph
                                    </Col>
                                </row>
                            </Col>
                            <Col className="gutter-row" span={8}>
                                bar graph
                                <DottedBox>num-2</DottedBox>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="gutter-row" span={16}>
                                line graph
                                <DottedBox>num-1</DottedBox>
                            </Col>
                            <Col className="gutter-row" span={8}>
                                table
                                <DottedBox>num-2</DottedBox>
                            </Col>
                        </Row>
                </Col>
            </Row>
        </div>
    )
}