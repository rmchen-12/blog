import { Col, Row } from 'antd';
import { inject, observer } from 'mobx-react';
import Link from 'next/link';
import { withRouter, WithRouterProps } from 'next/router';
import React from 'react';
import { Store } from 'store';

interface HeaderProps extends WithRouterProps {
  style: React.CSSProperties;
  store?: Store;
}

const Header = inject("store")(
  observer(({ router, store, style }: HeaderProps) => {
    return (
      <div style={style}>
        <div style={{ boxShadow: "0px 15px 10px -15px #e8e8e8" }}>
          <Row>
            <Col
              style={{ fontSize: "60px", color: "#7d7d7d", fontWeight: 600 }}
              lg={{ offset: 2 }}
            >
              RMCHEN'blog
            </Col>
            <Row type="flex" justify="end" style={{ marginBottom: "10px" }}>
              {store!.tagStore.tags!.map((v, index) => (
                <Col
                  lg={{ span: 2, pull: 2 }}
                  md={3}
                  sm={4}
                  xs={4}
                  style={{ cursor: "pointer", textAlign: "right" }}
                  key={index}
                >
                  <Link href={v.url}>
                    <a
                      style={
                        router && RegExp(v.url).test(router.pathname)
                          ? { color: "#4682B4" }
                          : {}
                      }
                    >
                      {v.tagName}
                    </a>
                  </Link>
                </Col>
              ))}
            </Row>
          </Row>
        </div>
        <style>
          {`
          a{
            color: #7d7d7d;
            font-size: 20px
          }
          a:hover{
            color: #4682B4;
            font-size: 20px
          }
        `}
        </style>
      </div>
    );
  })
);

export default withRouter(Header);
